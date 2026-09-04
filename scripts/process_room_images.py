#!/usr/bin/env python3
"""Generate room-gallery WebP images and Jekyll data from upload folders."""
from __future__ import annotations

import json
import re
import shutil
from pathlib import Path
from urllib.parse import quote

from PIL import Image, ImageOps

SOURCE = Path("assets/uploads/rooms")
OUTPUT = Path("assets/images/rooms")
DATA = Path("_data/rooms.json")
MAX_EDGE = 1280
WEBP_QUALITY = 90
SUPPORTED = {".jpg", ".jpeg", ".png", ".webp"}

COPY = {
    "bedroom": {
        "title_en": "Bright sleeping space",
        "title_vi": "Không gian nghỉ ngơi",
        "caption_en": "Twin beds, warm finishes and natural light.",
        "caption_vi": "Hai giường, nội thất ấm áp và nhiều ánh sáng.",
        "alt_en": "Bright twin guest room at Pinewood Hotel Dalat",
        "alt_vi": "Phòng hai giường sáng thoáng tại Pinewood Hotel Dalat",
    },
    "amenities": {
        "title_en": "Prepared amenities",
        "title_vi": "Tiện nghi được chuẩn bị",
        "caption_en": "Useful room details arranged for an easy stay.",
        "caption_vi": "Những chi tiết thiết thực cho kỳ lưu trú thuận tiện.",
        "alt_en": "In-room amenities at Pinewood Hotel Dalat",
        "alt_vi": "Tiện nghi trong phòng tại Pinewood Hotel Dalat",
    },
    "bathroom": {
        "title_en": "Private bathroom",
        "title_vi": "Phòng tắm riêng",
        "caption_en": "A clean, comfortable bathroom with essential amenities.",
        "caption_vi": "Không gian sạch sẽ, thoải mái và đầy đủ tiện nghi cơ bản.",
        "alt_en": "Guest bathroom at Pinewood Hotel Dalat",
        "alt_vi": "Phòng tắm tại Pinewood Hotel Dalat",
    },
}


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "image"


def room_title(slug: str) -> tuple[str, str]:
    if slug == "pinewood-room":
        return "Pinewood Room", "Phòng Pinewood"
    title = re.sub(r"[-_]+", " ", slug).strip().title()
    return title, title


def default_image_copy(stem: str, room_en: str, room_vi: str) -> dict[str, str]:
    lower = stem.lower()
    for key, values in COPY.items():
        if key in lower:
            return dict(values)
    readable = re.sub(r"^\d+[\s_-]*", "", stem)
    readable = re.sub(r"[-_]+", " ", readable).strip().title() or "Room detail"
    return {
        "title_en": readable,
        "title_vi": readable,
        "caption_en": f"A closer look at {room_en} at Pinewood Hotel Dalat.",
        "caption_vi": f"Một góc nhìn chi tiết về {room_vi} tại Pinewood Hotel Dalat.",
        "alt_en": f"{readable} at {room_en}, Pinewood Hotel Dalat",
        "alt_vi": f"{readable} tại {room_vi}, Pinewood Hotel Dalat",
    }


def web_url(path: Path) -> str:
    return "/" + quote(path.as_posix(), safe="/")


def load_meta(room_dir: Path) -> dict:
    path = room_dir / "_room.json"
    if not path.exists():
        return {}
    return json.loads(path.read_text(encoding="utf-8"))


def process() -> list[dict]:
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir(parents=True, exist_ok=True)
    DATA.parent.mkdir(parents=True, exist_ok=True)

    rooms: list[dict] = []
    if not SOURCE.exists():
        DATA.write_text("[]\n", encoding="utf-8")
        return rooms

    for room_dir in sorted(p for p in SOURCE.iterdir() if p.is_dir() and not p.name.startswith(".")):
        slug = slugify(room_dir.name)
        meta = load_meta(room_dir)
        default_en, default_vi = room_title(room_dir.name)
        name_en = meta.get("name_en", default_en)
        name_vi = meta.get("name_vi", default_vi)
        description_en = meta.get("description_en", "Real room photos from Pinewood Hotel Dalat.")
        description_vi = meta.get("description_vi", "Hình ảnh thực tế phòng nghỉ tại Pinewood Hotel Dalat.")
        image_meta = meta.get("images", {})

        output_dir = OUTPUT / slug
        output_dir.mkdir(parents=True, exist_ok=True)
        images = []

        sources = sorted(
            p for p in room_dir.iterdir()
            if p.is_file() and p.suffix.lower() in SUPPORTED and not p.name.startswith("_")
        )
        for source in sources:
            stem_slug = slugify(source.stem)
            target = output_dir / f"{stem_slug}.webp"
            with Image.open(source) as opened:
                image = ImageOps.exif_transpose(opened).convert("RGB")
                image.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
                width, height = image.size
                image.save(target, "WEBP", quality=WEBP_QUALITY, method=6)

            copy = default_image_copy(source.stem, name_en, name_vi)
            overrides = image_meta.get(source.name, {})
            copy.update({k: v for k, v in overrides.items() if isinstance(v, str) and v})
            images.append({
                "display": web_url(target),
                "full": web_url(source),
                "width": width,
                "height": height,
                **copy,
            })

        if images:
            rooms.append({
                "slug": slug,
                "name_en": name_en,
                "name_vi": name_vi,
                "description_en": description_en,
                "description_vi": description_vi,
                "images": images,
            })

    DATA.write_text(json.dumps(rooms, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return rooms


if __name__ == "__main__":
    generated = process()
    print(f"Generated {sum(len(room['images']) for room in generated)} room images across {len(generated)} room type(s).")
