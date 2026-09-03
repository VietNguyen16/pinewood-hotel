(() => {
  const BASE = 'https://pinewoodhotel.vn';
  const IMAGE = `${BASE}/assets/images/pinewood-experience.webp`;
  const ROOM_IMAGE = `${BASE}/assets/images/seo/pinewood-room.svg`;
  const CAFE_IMAGE = `${BASE}/assets/images/seo/pinewood-cafe.svg`;
  const LOGO = `${BASE}/assets/logo/pinewood-logo.png`;
  const HOTEL_ID = `${BASE}/#hotel`;
  const WEBSITE_ID = `${BASE}/#website`;
  const INSTAGRAM = 'https://www.instagram.com/pinewooddalat/';
  const TIKTOK = 'https://www.tiktok.com/@dalat.pinewood';
  const MAP = 'https://www.google.com/maps/dir/?api=1&destination=Pinewood%20Hotel%20Dalat%2C%2054%20%C4%90%C6%B0%E1%BB%9Dng%20V%C3%B5%20Tr%C6%B0%E1%BB%9Dng%20To%E1%BA%A3n%2C%20%C4%90%C3%A0%20L%E1%BA%A1t%2C%20L%C3%A2m%20%C4%90%E1%BB%93ng%2C%20Vi%E1%BB%87t%20Nam';

  const routes = {
    '/': ['vi', true, 'Pinewood Hotel Dalat | Khách sạn tại Đà Lạt', 'Pinewood Hotel Dalat tại 54 Võ Trường Toản, Đà Lạt với 50 phòng và suite. Xem ảnh phòng thực tế, dịch vụ, vị trí và liên hệ trực tiếp với khách sạn.', `${BASE}/`, `${BASE}/en/`, 'Trang chủ'],
    '/en': ['en', true, 'Pinewood Hotel Dalat | Hotel in Da Lat, Vietnam', 'Official website of Pinewood Hotel Dalat at 54 Vo Truong Toan Street with 50 rooms and suites. See real room photos, services, location and direct contact.', `${BASE}/en/`, `${BASE}/`, 'Home'],
    '/dich-vu': ['vi', true, 'Dịch vụ khách sạn tại Đà Lạt | Pinewood Hotel Dalat', 'Khám phá dịch vụ tại Pinewood Hotel Dalat: Wi-Fi miễn phí, bữa sáng 06:30–09:00, nhà hàng, café, buồng phòng và hỗ trợ Lễ tân.', `${BASE}/dich-vu/`, `${BASE}/en/services/`, 'Dịch vụ'],
    '/en/services': ['en', true, 'Hotel Services in Da Lat | Pinewood Hotel Dalat', 'Explore services at Pinewood Hotel Dalat including complimentary Wi-Fi, breakfast 06:30–09:00, restaurant and café service, housekeeping and Reception support.', `${BASE}/en/services/`, `${BASE}/dich-vu/`, 'Services'],
    '/lien-he': ['vi', true, 'Liên hệ & chỉ đường | Pinewood Hotel Dalat', 'Liên hệ Pinewood Hotel Dalat tại 54 Võ Trường Toản, Đà Lạt. Điện thoại 0785 098 686, email, Zalo và chỉ đường đến khách sạn.', `${BASE}/lien-he/`, `${BASE}/en/contact/`, 'Liên hệ'],
    '/en/contact': ['en', true, 'Contact & Directions | Pinewood Hotel Dalat', 'Contact Pinewood Hotel Dalat at 54 Vo Truong Toan Street, Da Lat. Call +84 785 098 686, email the hotel or get directions.', `${BASE}/en/contact/`, `${BASE}/lien-he/`, 'Contact'],
    '/moi-truong': ['vi', true, 'Lưu trú có trách nhiệm | Pinewood Hotel Dalat', 'Tìm hiểu các hướng dẫn sử dụng tài nguyên có trách nhiệm và bảo vệ môi trường dành cho khách tại Pinewood Hotel Dalat, Đà Lạt.', `${BASE}/moi-truong/`, `${BASE}/en/environment/`, 'Môi trường'],
    '/en/environment': ['en', true, 'Responsible Stay & Environment | Pinewood Hotel Dalat', 'Learn about responsible resource use and environmental guidance for guests staying at Pinewood Hotel Dalat in Da Lat, Vietnam.', `${BASE}/en/environment/`, `${BASE}/moi-truong/`, 'Environment'],
    '/wifi': ['vi', false, 'Wi-Fi | Pinewood Hotel Dalat', 'Thông tin Wi-Fi dành cho khách đang lưu trú tại Pinewood Hotel Dalat.', `${BASE}/wifi/`, `${BASE}/en/wifi/`, 'Wi-Fi'],
    '/en/wifi': ['en', false, 'Wi-Fi | Pinewood Hotel Dalat', 'Wi-Fi information for guests currently staying at Pinewood Hotel Dalat.', `${BASE}/en/wifi/`, `${BASE}/wifi/`, 'Wi-Fi'],
    '/bua-sang': ['vi', false, 'Bữa sáng | Pinewood Hotel Dalat', 'Thông tin bữa sáng dành cho khách đang lưu trú tại Pinewood Hotel Dalat.', `${BASE}/bua-sang/`, `${BASE}/en/breakfast/`, 'Bữa sáng'],
    '/en/breakfast': ['en', false, 'Breakfast | Pinewood Hotel Dalat', 'Breakfast information for guests currently staying at Pinewood Hotel Dalat.', `${BASE}/en/breakfast/`, `${BASE}/bua-sang/`, 'Breakfast'],
    '/noi-quy': ['vi', false, 'Nội quy khách sạn | Pinewood Hotel Dalat', 'Nội quy và hướng dẫn dành cho khách đang lưu trú tại Pinewood Hotel Dalat.', `${BASE}/noi-quy/`, `${BASE}/en/hotel-rules/`, 'Nội quy'],
    '/en/hotel-rules': ['en', false, 'Hotel Rules | Pinewood Hotel Dalat', 'Hotel rules and guidance for guests currently staying at Pinewood Hotel Dalat.', `${BASE}/en/hotel-rules/`, `${BASE}/noi-quy/`, 'Hotel Rules'],
    '/an-toan': ['vi', false, 'An toàn & khẩn cấp | Pinewood Hotel Dalat', 'Thông tin an toàn và hướng dẫn khẩn cấp dành cho khách lưu trú tại Pinewood Hotel Dalat.', `${BASE}/an-toan/`, `${BASE}/en/safety/`, 'An toàn'],
    '/en/safety': ['en', false, 'Safety & Emergency | Pinewood Hotel Dalat', 'Safety and emergency guidance for guests currently staying at Pinewood Hotel Dalat.', `${BASE}/en/safety/`, `${BASE}/an-toan/`, 'Safety'],
    '/thong-tin': ['vi', false, 'Thông tin lưu trú | Pinewood Hotel Dalat', 'Thông tin tổng hợp dành cho khách đang lưu trú tại Pinewood Hotel Dalat.', `${BASE}/thong-tin/`, `${BASE}/en/hotel-information/`, 'Thông tin lưu trú'],
    '/en/hotel-information': ['en', false, 'Guest Information | Pinewood Hotel Dalat', 'Complete guest information for visitors currently staying at Pinewood Hotel Dalat.', `${BASE}/en/hotel-information/`, `${BASE}/thong-tin/`, 'Guest Information'],
    '/thu-chao-mung': ['vi', false, 'Thư chào mừng | Pinewood Hotel Dalat', 'Thư chào mừng dành cho khách lưu trú tại Pinewood Hotel Dalat.', `${BASE}/thu-chao-mung/`, `${BASE}/en/welcome/`, 'Thư chào mừng'],
    '/en/welcome': ['en', false, 'Welcome | Pinewood Hotel Dalat', 'Welcome information for guests staying at Pinewood Hotel Dalat.', `${BASE}/en/welcome/`, `${BASE}/thu-chao-mung/`, 'Welcome']
  };

  const normalize = p => (p || '/').replace(/\/+$/, '') || '/';
  function unpack(key) {
    const r = routes[key];
    return r ? { lang:r[0], index:r[1], title:r[2], description:r[3], canonical:r[4], alternate:r[5], label:r[6] } : {
      lang:key.startsWith('/en')?'en':'vi', index:false, title:'Pinewood Hotel Dalat',
      description:key.startsWith('/en')?'Guest information from Pinewood Hotel Dalat.':'Thông tin dành cho khách của Pinewood Hotel Dalat.',
      canonical:`${BASE}${key==='/'?'/':`${key}/`}`, alternate:key.startsWith('/en')?`${BASE}/`:`${BASE}/en/`, label:'Pinewood Hotel Dalat'
    };
  }
  function meta(selector, attr, name, content) {
    let n=document.head.querySelector(selector);
    if(!n){n=document.createElement('meta');n.setAttribute(attr,name);document.head.appendChild(n);}
    n.setAttribute('content',content);
  }
  function link(rel, href, hreflang) {
    const s=hreflang?`link[rel="${rel}"][hreflang="${hreflang}"]`:`link[rel="${rel}"]:not([hreflang])`;
    let n=document.head.querySelector(s);
    if(!n){n=document.createElement('link');n.rel=rel;if(hreflang)n.hreflang=hreflang;document.head.appendChild(n);}
    n.href=href;
  }
  function structuredData(route) {
    let n=document.getElementById('seo-structured-data');
    if(!n){n=document.createElement('script');n.type='application/ld+json';n.id='seo-structured-data';document.head.appendChild(n);}
    const graph=[
      {
        '@type':'Hotel','@id':HOTEL_ID,name:'Pinewood Hotel Dalat',url:`${BASE}/`,
        logo:{'@type':'ImageObject',url:LOGO},image:[IMAGE,ROOM_IMAGE,CAFE_IMAGE],telephone:'+84785098686',email:'info@pinewoodhotel.vn',
        slogan:'Ngủ ngon - Ấm áp - Đậm chất Đà Lạt',numberOfRooms:50,checkinTime:'14:00',checkoutTime:'12:00',
        address:{'@type':'PostalAddress',streetAddress:'54 Đường Võ Trường Toản',addressLocality:'Đà Lạt',addressRegion:'Lâm Đồng',addressCountry:'VN'},
        sameAs:[INSTAGRAM,TIKTOK],hasMap:MAP,
        contactPoint:{'@type':'ContactPoint',telephone:'+84785098686',contactType:'customer service',availableLanguage:['Vietnamese','English']},
        amenityFeature:[
          {'@type':'LocationFeatureSpecification',name:'Free Wi-Fi',value:true},
          {'@type':'LocationFeatureSpecification',name:'Breakfast',value:true},
          {'@type':'LocationFeatureSpecification',name:'Restaurant',value:true},
          {'@type':'LocationFeatureSpecification',name:'Air conditioning',value:true}
        ]
      },
      {'@type':'WebSite','@id':WEBSITE_ID,url:`${BASE}/`,name:'Pinewood Hotel Dalat',publisher:{'@id':HOTEL_ID},inLanguage:['vi','en']},
      {'@type':'WebPage','@id':`${route.canonical}#webpage`,url:route.canonical,name:route.title,description:route.description,inLanguage:route.lang,isPartOf:{'@id':WEBSITE_ID},about:{'@id':HOTEL_ID},primaryImageOfPage:{'@type':'ImageObject',url:IMAGE}}
    ];
    if(route.index&&route.canonical!==`${BASE}/`&&route.canonical!==`${BASE}/en/`) {
      graph.push({'@type':'BreadcrumbList',itemListElement:[
        {'@type':'ListItem',position:1,name:route.lang==='en'?'Home':'Trang chủ',item:route.lang==='en'?`${BASE}/en/`:`${BASE}/`},
        {'@type':'ListItem',position:2,name:route.label,item:route.canonical}
      ]});
    }
    n.textContent=JSON.stringify({'@context':'https://schema.org','@graph':graph});
  }
  function apply(){
    const route=unpack(normalize(location.pathname));
    document.documentElement.lang=route.lang;
    document.title=route.title;
    meta('meta[name="description"]','name','description',route.description);
    meta('meta[name="robots"]','name','robots',route.index?'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1':'noindex,follow');
    meta('meta[property="og:type"]','property','og:type','website');
    meta('meta[property="og:site_name"]','property','og:site_name','Pinewood Hotel Dalat');
    meta('meta[property="og:title"]','property','og:title',route.title);
    meta('meta[property="og:description"]','property','og:description',route.description);
    meta('meta[property="og:url"]','property','og:url',route.canonical);
    meta('meta[property="og:image"]','property','og:image',IMAGE);
    meta('meta[property="og:image:alt"]','property','og:image:alt','Pinewood Hotel Dalat');
    meta('meta[property="og:locale"]','property','og:locale',route.lang==='en'?'en_US':'vi_VN');
    meta('meta[property="og:locale:alternate"]','property','og:locale:alternate',route.lang==='en'?'vi_VN':'en_US');
    meta('meta[name="twitter:card"]','name','twitter:card','summary_large_image');
    meta('meta[name="twitter:title"]','name','twitter:title',route.title);
    meta('meta[name="twitter:description"]','name','twitter:description',route.description);
    meta('meta[name="twitter:image"]','name','twitter:image',IMAGE);
    link('canonical',route.canonical);
    link('alternate',route.lang==='en'?route.alternate:route.canonical,'vi');
    link('alternate',route.lang==='en'?route.canonical:route.alternate,'en');
    link('alternate',`${BASE}/`,'x-default');
    structuredData(route);
  }
  ['pushState','replaceState'].forEach(name=>{
    const original=history[name];
    history[name]=function(...args){const out=original.apply(this,args);queueMicrotask(apply);return out;};
  });
  addEventListener('popstate',apply);
  addEventListener('DOMContentLoaded',apply,{once:true});
  apply();
})();
