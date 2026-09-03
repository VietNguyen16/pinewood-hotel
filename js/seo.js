(() => {
  const BASE = 'https://pinewoodhotel.vn';
  const IMAGE = `${BASE}/assets/images/pinewood-experience.webp`;
  const LOGO = `${BASE}/assets/logo/pinewood-logo.png`;
  const HOTEL_ID = `${BASE}/#hotel`;
  const WEBSITE_ID = `${BASE}/#website`;
  const routes = {
    '/': ['vi', true, 'Pinewood Hotel Dalat | Khách sạn tại Đà Lạt', 'Pinewood Hotel Dalat tại 54 Võ Trường Toản, Đà Lạt. Khám phá dịch vụ, vị trí và thông tin liên hệ trực tiếp với khách sạn.', `${BASE}/`, `${BASE}/en/`, 'Trang chủ'],
    '/en': ['en', true, 'Pinewood Hotel Dalat | Hotel in Da Lat, Vietnam', 'Official website of Pinewood Hotel Dalat at 54 Vo Truong Toan Street, Da Lat. Explore hotel services, location and direct contact information.', `${BASE}/en/`, `${BASE}/`, 'Home'],
    '/dich-vu': ['vi', true, 'Dịch vụ khách sạn | Pinewood Hotel Dalat', 'Khám phá các dịch vụ và tiện ích dành cho khách lưu trú tại Pinewood Hotel Dalat, 54 Võ Trường Toản, Đà Lạt.', `${BASE}/dich-vu/`, `${BASE}/en/services/`, 'Dịch vụ'],
    '/en/services': ['en', true, 'Hotel Services | Pinewood Hotel Dalat', 'Explore guest services and amenities at Pinewood Hotel Dalat, located at 54 Vo Truong Toan Street in Da Lat, Vietnam.', `${BASE}/en/services/`, `${BASE}/dich-vu/`, 'Services'],
    '/lien-he': ['vi', true, 'Liên hệ & chỉ đường | Pinewood Hotel Dalat', 'Liên hệ Pinewood Hotel Dalat: 54 Võ Trường Toản, Đà Lạt, Lâm Đồng. Điện thoại 0785 098 686 và hướng dẫn đường đi đến khách sạn.', `${BASE}/lien-he/`, `${BASE}/en/contact/`, 'Liên hệ'],
    '/en/contact': ['en', true, 'Contact & Directions | Pinewood Hotel Dalat', 'Contact Pinewood Hotel Dalat at 54 Vo Truong Toan Street, Da Lat. Call +84 785 098 686 or get directions to the hotel.', `${BASE}/en/contact/`, `${BASE}/lien-he/`, 'Contact'],
    '/moi-truong': ['vi', true, 'Môi trường & lưu trú xanh | Pinewood Hotel Dalat', 'Tìm hiểu các hướng dẫn và thực hành hướng đến lưu trú có trách nhiệm với môi trường tại Pinewood Hotel Dalat, Đà Lạt.', `${BASE}/moi-truong/`, `${BASE}/en/environment/`, 'Môi trường'],
    '/en/environment': ['en', true, 'Environment & Responsible Stay | Pinewood Hotel Dalat', 'Learn about environmental guidance and responsible-stay practices for guests at Pinewood Hotel Dalat in Da Lat, Vietnam.', `${BASE}/en/environment/`, `${BASE}/moi-truong/`, 'Environment'],
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
    return r ? { lang:r[0], index:r[1], title:r[2], description:r[3], canonical:r[4], alternate:r[5], label:r[6] } : { lang:key.startsWith('/en')?'en':'vi', index:false, title:'Pinewood Hotel Dalat', description:key.startsWith('/en')?'Guest information from Pinewood Hotel Dalat.':'Thông tin dành cho khách của Pinewood Hotel Dalat.', canonical:`${BASE}${key==='/'?'/':`${key}/`}`, alternate:key.startsWith('/en')?`${BASE}/`:`${BASE}/en/`, label:'Pinewood Hotel Dalat' };
  }
  function meta(selector, attr, name, content) { let n=document.head.querySelector(selector); if(!n){n=document.createElement('meta');n.setAttribute(attr,name);document.head.appendChild(n);} n.setAttribute('content',content); }
  function link(rel, href, hreflang) { const s=hreflang?`link[rel="${rel}"][hreflang="${hreflang}"]`:`link[rel="${rel}"]:not([hreflang])`; let n=document.head.querySelector(s); if(!n){n=document.createElement('link');n.rel=rel;if(hreflang)n.hreflang=hreflang;document.head.appendChild(n);} n.href=href; }
  function structuredData(route) {
    let n=document.getElementById('seo-structured-data'); if(!n){n=document.createElement('script');n.type='application/ld+json';n.id='seo-structured-data';document.head.appendChild(n);}
    const graph=[
      {'@type':'Hotel','@id':HOTEL_ID,name:'Pinewood Hotel Dalat',url:`${BASE}/`,logo:{'@type':'ImageObject',url:LOGO},image:IMAGE,telephone:'+84785098686',email:'info@pinewoodhotel.vn',address:{'@type':'PostalAddress',streetAddress:'54 Đường Võ Trường Toản',addressLocality:'Đà Lạt',addressRegion:'Lâm Đồng',addressCountry:'VN'},checkinTime:'14:00',checkoutTime:'12:00'},
      {'@type':'WebSite','@id':WEBSITE_ID,url:`${BASE}/`,name:'Pinewood Hotel Dalat',publisher:{'@id':HOTEL_ID},inLanguage:['vi','en']},
      {'@type':'WebPage','@id':`${route.canonical}#webpage`,url:route.canonical,name:route.title,description:route.description,inLanguage:route.lang,isPartOf:{'@id':WEBSITE_ID},about:{'@id':HOTEL_ID},primaryImageOfPage:{'@type':'ImageObject',url:IMAGE}}
    ];
    if(route.index&&route.canonical!==`${BASE}/`&&route.canonical!==`${BASE}/en/`)graph.push({'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:route.lang==='en'?'Home':'Trang chủ',item:route.lang==='en'?`${BASE}/en/`:`${BASE}/`},{'@type':'ListItem',position:2,name:route.label,item:route.canonical}]});
    n.textContent=JSON.stringify({'@context':'https://schema.org','@graph':graph});
  }
  function apply(){
    const route=unpack(normalize(location.pathname)); document.documentElement.lang=route.lang; document.title=route.title;
    meta('meta[name="description"]','name','description',route.description); meta('meta[name="robots"]','name','robots',route.index?'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1':'noindex,follow');
    meta('meta[property="og:type"]','property','og:type','website'); meta('meta[property="og:site_name"]','property','og:site_name','Pinewood Hotel Dalat'); meta('meta[property="og:title"]','property','og:title',route.title); meta('meta[property="og:description"]','property','og:description',route.description); meta('meta[property="og:url"]','property','og:url',route.canonical); meta('meta[property="og:image"]','property','og:image',IMAGE); meta('meta[property="og:image:alt"]','property','og:image:alt','Pinewood Hotel Dalat'); meta('meta[property="og:locale"]','property','og:locale',route.lang==='en'?'en_US':'vi_VN');
    meta('meta[name="twitter:card"]','name','twitter:card','summary_large_image'); meta('meta[name="twitter:title"]','name','twitter:title',route.title); meta('meta[name="twitter:description"]','name','twitter:description',route.description); meta('meta[name="twitter:image"]','name','twitter:image',IMAGE);
    link('canonical',route.canonical); link('alternate',route.lang==='en'?route.alternate:route.canonical,'vi'); link('alternate',route.lang==='en'?route.canonical:route.alternate,'en'); link('alternate',`${BASE}/`,'x-default'); structuredData(route);
  }
  ['pushState','replaceState'].forEach(name=>{const original=history[name];history[name]=function(...args){const out=original.apply(this,args);queueMicrotask(apply);return out;};}); addEventListener('popstate',apply); apply();
})();
