import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const output = new URL('./dist/', import.meta.url);
const line = 'https://line.me/R/ti/p/@329fogkk';
const phone = '0567-69-4600';
const phoneHref = 'tel:0567694600';
const address = '愛知県津島市百島町字三正六歩29-2';
const logoImage = '/assets/brand-logo.webp';

const nav = [
  ['/', 'トップ', 'home'],
  ['/service/', '車買取', 'service'],
  ['/support/', 'その他サービス', 'support'],
  ['/flow/', '査定の流れ', 'flow'],
  ['/store/', '店舗案内', 'store'],
  ['/faq/', 'よくある質問', 'faq'],
];

function arrow() { return '<span aria-hidden="true">↗</span>'; }
const iconPaths = {
  message: '<path d="M5 5.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 3v-4.4a2 2 0 0 1-1-1.7v-8a2 2 0 0 1 2-2Z"/><path d="M7.5 10.5h9m-9 4h5"/>',
  estimate: '<path d="M4 17a8 8 0 1 1 16 0"/><path d="m12 16 4-5"/><circle cx="12" cy="16" r="1.3"/><path d="M8 21h8"/>',
  inspect: '<path d="m5 15 1.5-5.5A2 2 0 0 1 8.4 8h7.2a2 2 0 0 1 1.9 1.5L19 15"/><path d="M4 15h16v4H4z"/><path d="M7.5 19v2m9-2v2"/><path d="M7.5 12h9"/>',
  payment: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8m-8 4 2.5 2.5L16 9m-8 8h8"/>',
  car: '<path d="m4 14 1.4-5A2 2 0 0 1 7.3 7h9.4a2 2 0 0 1 1.9 2L20 14"/><path d="M3 14h18v5H3zM6 19v2m12-2v2M7 16h1m8 0h1"/>',
  tool: '<path d="M20 7a5 5 0 0 1-6.6 4.7l-7.8 7.8a2 2 0 0 1-2.8-2.8l7.8-7.8A5 5 0 0 1 17 3l-3 3 2 2 4-1Z"/>',
  paint: '<path d="M4 5h12a2 2 0 0 1 2 2v4H4z"/><path d="M18 8h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-8v3"/><path d="M10 17h4v5h-4z"/>',
  shield: '<path d="M12 2 21 6v6c0 6-4 9-9 11-5-2-9-5-9-11V6z"/><path d="m8 12 3 3 5-6"/>',
  pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>'
};
function icon(name, cls = '') {
  return `<svg class="glyph ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]}</svg>`;
}
function lineButton(text = 'LINEで無料査定', cls = 'btn btn-primary') {
  return `<a class="${cls}" href="${line}" target="_blank" rel="noopener noreferrer"><span class="line-dot" aria-hidden="true"></span>${text}${arrow()}</a>`;
}
function phoneButton(text = '電話で相談', cls = 'btn btn-light') {
  return `<a class="${cls}" href="${phoneHref}">${text}<span aria-hidden="true">↗</span></a>`;
}
function sectionHeading(kicker, title, desc = '') {
  return `<div class="section-head"><span class="eyebrow">${kicker}</span><h2>${title}</h2>${desc ? `<p>${desc}</p>` : ''}</div>`;
}
function pageHero(kicker, title, lead) {
  return `<section class="page-hero"><div class="container page-hero-inner"><p class="page-crumb"><a href="/">ホーム</a><span aria-hidden="true"> / </span>${kicker}</p><div><span class="eyebrow">APPLE WORLD TSUSHIMA</span><h1>${title}</h1><p>${lead}</p></div></div></section>`;
}
function ctaBand(title = '査定のご相談は、LINE・お電話で。', lead = '売るかどうか決まっていなくても大丈夫です。査定だけでもお気軽にご相談ください。') {
  return `<section class="cta-band"><div class="container cta-band-inner"><div><span class="eyebrow">ご売却のご相談</span><h2>${title}</h2><p>${lead}</p></div><div class="cta-band-actions">${lineButton()}${phoneButton()}</div></div></section>`;
}
function header(active) {
  const navItems = nav.map(([href, label, key]) => `<a href="${href}" ${active === key ? 'aria-current="page"' : ''}>${label}</a>`).join('');
  return `<a class="skip-link" href="#main">本文へ移動</a><div class="utility-bar"><div class="container utility-inner"><span>ガレージ山田運営 ／ アップルワールドFC加盟店</span><div><span>10:00–18:00・木曜定休</span><a href="${phoneHref}">TEL ${phone}</a></div></div></div>
  <header class="site-header" id="top"><div class="container header-inner">
    <a class="brand" href="/" aria-label="アップルワールド津島店 トップ"><img src="${logoImage}" alt="" width="48" height="63"><span><strong>アップルワールド</strong><small>津島店 <i>｜ TSUSHIMA</i></small></span></a>
    <button class="menu-toggle" type="button" aria-label="メニューを開く" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span><span></span></button>
    <nav class="main-nav" id="primary-nav" aria-label="メインナビゲーション">${navItems}</nav>
    <a class="header-cta" href="/assessment/">無料査定を相談 <span aria-hidden="true">→</span></a>
  </div></header>`;
}
function footer() {
  return `<footer class="footer"><div class="container"><div class="footer-main"><div class="footer-about"><p class="footer-eyebrow">TSUSHIMA / AICHI</p><div class="footer-brand">アップルワールド<span>津島店</span></div><p>クルマのことを、地元で相談できる場所へ。</p><p class="operated">運営：ガレージ山田<br>アップルワールドFC加盟店</p></div><div class="footer-links"><h3>ご案内</h3><a href="/service/">車買取・無料査定</a><a href="/support/">中古車販売・修理・板金・保険</a><a href="/flow/">買取までの流れ</a><a href="/faq/">よくある質問</a><a href="/assessment/">LINEで査定相談</a></div><div class="footer-contact"><h3>店舗情報</h3><p>営業時間 10:00〜18:00<br>毎週木曜日定休</p><p class="footer-relocation">${address}</p><a class="footer-phone" href="${phoneHref}">${phone}</a><a class="footer-map" href="${line}" target="_blank" rel="noopener noreferrer">LINEで相談する ↗</a></div></div><div class="footer-bottom"><span>© 2026 Garage Yamada / Apple World Tsushima</span><span>愛知県津島市の車買取・無料査定</span></div></div></footer>
  <div class="mobile-actions"><a href="${phoneHref}" class="mobile-phone">電話で相談</a><a href="${line}" target="_blank" rel="noopener noreferrer" class="mobile-line">LINEで無料査定 ↗</a></div>`;
}
function shell({ title, description, active, body, home = false }) {
  const jsonLd = home ? `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org', '@type': 'AutoDealer',
    name: 'アップルワールド津島店',
    description: 'ガレージ山田が運営する、愛知県津島市の車買取・中古車販売・修理・板金塗装・自動車保険の相談窓口。',
    url: 'https://appleworld-yamada.jp/',
    telephone: '+81-567-69-4600',
    address: {'@type':'PostalAddress', addressRegion:'愛知県', addressLocality:'津島市', streetAddress:'百島町字三正六歩29-2', addressCountry:'JP'},
    openingHoursSpecification: [{ '@type':'OpeningHoursSpecification', dayOfWeek:['Monday','Tuesday','Wednesday','Friday','Saturday','Sunday'], opens:'10:00', closes:'18:00'}],
    areaServed:['津島市','愛西市','あま市','名古屋市中川区','名古屋市港区','桑名市']
  })}</script>` : '';
  return `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#25272a"><meta name="robots" content="noindex,nofollow"><title>${title}</title><meta name="description" content="${description}"><meta property="og:type" content="website"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><link rel="stylesheet" href="/assets/style.css">${home ? '<link rel="preload" as="image" href="/assets/staff2.webp" fetchpriority="high">' : ''}${jsonLd}</head><body class="${home ? 'home' : 'interior'}">${header(active)}<main id="main">${body}</main>${footer()}<script src="/assets/site.js" defer></script></body></html>`;
}


const process = [
  ['01','LINEで査定のご相談','車種・年式など、お車の情報をLINEでお送りください。'],
  ['02','概算の査定額をご案内','いただいた内容をもとに、概算の査定額をお調べします。'],
  ['03','実車査定・ご契約','査定額にご納得いただいてから実車を確認。ご希望に応じて売却手続きへ進みます。'],
  ['04','お車のお引き取り・お支払い','必要書類とお車が揃い次第、最短即日のお振り込みにも対応します。'],
];
const processIcons = ['message','estimate','inspect','payment'];
function processHtml() {return process.map(([no,title,text],i)=>`<li class="step-card"><span class="step-symbol">${icon(processIcons[i])}</span><div class="step-content"><span class="step-no">STEP ${no}</span><h3>${title}</h3><p>${text}</p></div></li>`).join('');}

const faq = [
 ['査定だけでもお願いできますか？','はい。売却するか迷っている段階でもお気軽にご相談ください。無理な営業は行いません。'],
 ['車検切れの車や動かない車でも査定できますか？','はい。車検切れのお車や不動車についても、出張査定でご相談いただけます。'],
 ['ローンが残っている車も売却できますか？','対応可能です。所有権解除や残債の手続きについてもご案内いたします。'],
 ['事故車・故障車・過走行車も相談できますか？','はい。状態を確認したうえで査定いたします。まずは車種や状況をお知らせください。'],
 ['カスタム車でも査定できますか？','はい。社外パーツやカスタム内容も含め、お車の状態を確認いたします。'],
 ['査定にはどれくらい時間がかかりますか？','実車査定は1台あたり30分〜1時間ほどが目安です。お車の状態により前後します。'],
 ['代金はいつ振り込まれますか？','必要書類とお車が揃い次第、最短即日から数日以内のお振り込みに対応しています。'],
 ['出張査定に費用はかかりますか？','出張査定も含めて査定は無料です。対応エリアについては店舗案内をご覧ください。'],
];
function faqHtml(items=faq){return items.map(([q,a])=>`<details class="faq-item"><summary>${q}<span class="plus" aria-hidden="true"></span></summary><div class="faq-answer">${a}</div></details>`).join('');}

const home = `
<section class="hero"><div class="container hero-grid">
  <div class="hero-message"><span class="hero-local">愛知県津島市の車買取・無料査定</span><h1>車を売るなら、<br>まずは<span>話してみる。</span></h1><p>査定だけでも、売却を迷っている段階でも。<br>ガレージ山田が運営する津島店が、直接お話を伺います。</p><div class="hero-actions">${lineButton('LINEで無料査定')}<a class="hero-call" href="${phoneHref}">電話で相談 <strong>${phone}</strong></a></div><p class="hero-note">ガレージ山田運営 ／ アップルワールドFC加盟店</p></div>
  <figure class="hero-photo"><img src="/assets/staff2.webp" width="1848" height="1343" alt="アップルワールド津島店のスタッフが笑顔で立つ写真" fetchpriority="high"><figcaption><span class="hero-portrait-tag">STAFF PHOTO</span><span>アップルワールド津島店のスタッフです</span></figcaption></figure>
</div><div class="container hero-bottom"><span class="hero-bottom-label">TSUSHIMA CAR SHOP</span><span>無料査定・出張査定のご相談を受付中</span><a href="/service/">車買取サービスへ <span aria-hidden="true">→</span></a></div></section>
<section class="section-pad offer-section"><div class="container">
  <div class="offer-heading"><div><p class="eyebrow">01 / ご相談できること</p><h2>売却も、その先も。<br>クルマの相談窓口。</h2></div><p>車買取を中心に、次の一台探しから修理・保険まで。お車のことを、同じお店でご相談いただけます。</p></div>
  <div class="offer-grid"><a class="offer-main" href="/service/"><div class="offer-main-photo"><img src="/assets/garage-yamada-car.webp" alt="ガレージ山田で撮影した実車" loading="lazy"></div><div class="offer-main-body"><span class="offer-number">MAIN SERVICE / 01</span><h3>車買取・無料査定</h3><p>査定だけ、ローンが残っている、車検が切れている。まずはお車の状況をお聞かせください。</p><span class="offer-link">買取について見る <span aria-hidden="true">→</span></span></div></a>
  <div class="offer-list"><p class="offer-list-caption">そのほかにできること</p><a href="/support/#sales"><span class="service-icon service-icon-car">${icon('car')}</span><strong>中古車販売</strong><small>次の一台を探す</small><b aria-hidden="true">↗</b></a><a href="/support/#maintenance"><span class="service-icon service-icon-tool">${icon('tool')}</span><strong>修理・整備</strong><small>日々のメンテナンス</small><b aria-hidden="true">↗</b></a><a href="/support/#bodywork"><span class="service-icon service-icon-paint">${icon('paint')}</span><strong>板金塗装</strong><small>傷・へこみのご相談</small><b aria-hidden="true">↗</b></a><a href="/support/#insurance"><span class="service-icon service-icon-shield">${icon('shield')}</span><strong>自動車保険</strong><small>万が一への備え</small><b aria-hidden="true">↗</b></a></div></div>
</div></section>
<section class="section-pad conversations-section"><div class="container"><div class="conversations-grid"><div><p class="eyebrow">02 / はじめての車売却</p><h2>こんなことも、<br>聞いてください。</h2><p>「本当に売っていいのかな」と迷うのは自然なこと。お車の状態や売却時期を一緒に整理します。</p><a class="text-link" href="/faq/">よくある質問を見る <span aria-hidden="true">→</span></a></div><div class="conversation-list"><a href="/faq/"><span>Q.</span><strong>まだ売るか決めていないのですが？</strong><b aria-hidden="true">→</b></a><a href="/faq/"><span>Q.</span><strong>ローンが残っている車でも大丈夫？</strong><b aria-hidden="true">→</b></a><a href="/faq/"><span>Q.</span><strong>車検切れ・動かない車も相談できる？</strong><b aria-hidden="true">→</b></a><a href="/faq/"><span>Q.</span><strong>査定だけでも無料ですか？</strong><b aria-hidden="true">→</b></a></div></div></div></section>
<section class="section-pad people-section"><div class="container"><div class="people-heading"><div><p class="eyebrow">03 / 津島店のスタッフ</p><h2>写真の顔ぶれが、<br>ご相談を伺います。</h2></div><p>掲載しているのは実際の津島店のスタッフ写真。まずは人を知っていただけたら、うれしいです。</p></div><div class="people-editorial"><figure class="people-feature"><img src="/assets/staff1.webp" alt="アップルワールド津島店の女性スタッフ2名" loading="lazy"><figcaption>津島店スタッフ</figcaption></figure><div class="people-side"><figure><img src="/assets/staff3.webp" alt="アップルワールド津島店のスタッフ" loading="lazy"><figcaption>車に関するご相談をお伺いします</figcaption></figure><a href="/store/">スタッフの紹介を見る <span aria-hidden="true">→</span></a></div></div></div></section>
<section class="section-pad process-section"><div class="container"><div class="journey-heading"><div><p class="eyebrow">04 / 買取の流れ</p><h2>ご相談から、お支払いまで。</h2></div><p>最初の一歩はLINEでのお問い合わせ。ご売却を決めるまでの流れを4つにまとめました。</p></div><ol class="journey-track">${process.map(([no,title,text],i)=>`<li class="journey-step"><span class="journey-icon">${icon(processIcons[i])}</span><span class="journey-no">STEP ${no}</span><h3>${title}</h3><p>${text}</p></li>`).join('')}</ol><a class="text-link journey-more" href="/flow/">買取手続きの流れを詳しく見る <span aria-hidden="true">→</span></a></div></section>
<section class="section-pad visit-section"><div class="container contact-place"><div><p class="eyebrow">05 / ご来店・お問い合わせ</p><h2>店舗へのご相談は、<br>LINE・お電話から。</h2><p>アップルワールド津島店の所在地は下記の住所です。スタッフがご来店・査定のご相談をお受けしています。</p><address class="contact-address">${address}</address><a class="text-link" href="/store/">店舗・スタッフのご案内 <span aria-hidden="true">→</span></a></div><div class="contact-place-panel"><span class="contact-icon">${icon('pin')}</span><div><small>営業時間</small><strong>10:00〜18:00</strong><span>毎週木曜日定休</span></div><a href="${phoneHref}">${phone}<span aria-hidden="true">↗</span></a></div></div></section>
<section class="section-pad faq-preview"><div class="container faq-preview-grid"><div><p class="eyebrow">06 / よくあるご質問</p><h2>気になることを、<br>先に確認。</h2><p>査定や売却について、よくある質問をまとめています。</p><a class="text-link" href="/faq/">すべての質問を見る <span aria-hidden="true">→</span></a></div><div class="faq-list">${faqHtml(faq.slice(0,4))}</div></div></section>${ctaBand()}`;

const service = `${pageHero('車買取・無料査定', '車買取・無料査定のご案内', '津島市を拠点に無料査定・出張査定をご相談いただけます。')}
<section class="section-pad"><div class="container buying-opening"><div class="buying-copy"><p class="eyebrow">車を手放すとき、最初の相談</p><h2>「いくらになる？」から、<br>始めてください。</h2><p>車の売却には、価格だけでなく時期や書類への不安もあります。まだ売却を決めていなくても、お車の状態とご希望を伺いながら進めます。</p><div class="chip-list"><span>普通車・軽自動車</span><span>ローン中の車</span><span>事故車・故障車</span><span>不動車・車検切れ</span><span>カスタム車</span></div><a class="text-link" href="/assessment/">まずは無料査定を相談する <span aria-hidden="true">→</span></a></div><figure class="buying-photo"><img src="/assets/staff4.webp" alt="車の整備スペースに立つアップルワールド津島店のスタッフ" loading="lazy"></figure></div></section>
<section class="section-pad light-section"><div class="container buying-guide"><div><p class="eyebrow">査定について</p><h2>気になる状況も、<br>そのままご相談を。</h2><p>お車の状態に応じた査定をご案内します。対応の可否や必要なお手続きは、内容を伺ってからお伝えします。</p></div><div class="buying-guide-list"><div><span>01</span><h3>ローンが残っている</h3><p>所有権の解除や残債のお手続きについてご案内します。</p></div><div><span>02</span><h3>車検切れ・動かない車</h3><p>出張査定を含め、ご相談いただけます。</p></div><div><span>03</span><h3>事故・故障・カスタムがある</h3><p>状態やパーツなどを確認しながら査定します。</p></div></div></div></section>
<section class="section-pad"><div class="container process-grid"><div class="process-intro"><p class="eyebrow">売却までの流れ</p><h2>最初はLINEから。</h2><p>LINEでお車の情報をご連絡いただき、概算のご案内から実車査定へ進みます。</p><a class="text-link" href="/flow/">お手続きの詳細を見る <span aria-hidden="true">→</span></a></div><ol class="steps-list">${processHtml()}</ol></div></section>
<section class="section-pad light-section"><div class="container narrow-block">${sectionHeading('出張査定', '津島市から周辺エリアへ。', '津島市・愛西市・あま市・名古屋市中川区／港区・桑名市などのご相談を受け付けています。')}<div class="area-banner"><span>出張査定も無料です</span><p>実際に出張可能な地域・日時については、LINEまたはお電話でご確認ください。</p>${lineButton('出張査定を相談する')}</div></div></section>${ctaBand()}`;

const supportServices = [
 ['sales','01','中古車販売','次の一台も、同じ窓口で。','買取だけでなく、中古車の販売にも対応しています。ライフスタイルやご予算に合わせたお乗り換えについてご相談ください。'],
 ['maintenance','02','修理・整備','いつもの安心を、これからも。','車の不調や日々のメンテナンスなど、購入後のカーライフについてもご相談いただけます。'],
 ['bodywork','03','板金塗装','傷やへこみの相談も。','ボディの傷やへこみ、鈑金塗装についても対応しています。車の状態に合わせてご案内します。'],
 ['insurance','04','自動車保険','もしもの備えまで、身近に。','自動車保険のご相談にも対応。お車に関することを一つの窓口でご相談いただけます。'],
];
const support = `${pageHero('CAR LIFE SUPPORT', '販売・修理・板金・保険もご相談ください。', '中古車販売・修理・整備・板金塗装・自動車保険まで、幅広く対応します。')}
<section class="section-pad"><div class="container"><div class="section-head centered"><span class="eyebrow">ONE STOP SERVICE</span><h2>お車に関するご相談を、<br>ひとつの窓口に。</h2><p>運営元のガレージ山田が、車買取から乗り換え・アフターサービスまでご案内します。</p></div><div class="support-list">${supportServices.map(([id,no,title,tagline,desc],i)=>`<article class="support-row" id="${id}"><span class="support-number">${no}</span><span class="support-symbol">${icon(['car','tool','paint','shield'][i])}</span><div><h3>${title}</h3><small>${tagline}</small></div><div><p>${desc}</p></div><a class="round-link" href="/assessment/" aria-label="${title}を相談する">↗</a></article>`).join('')}</div><div class="notice-note">※ 各サービスの対応内容や料金はお車の状態・ご相談内容により異なります。詳しくはお問い合わせください。</div></div></section>${ctaBand('売却も、乗り換えも。お気軽にご相談ください。','お車に関するお悩みを、まとめてご相談いただけます。')}`;

const flow = `${pageHero('OUR PROCESS', '車買取のお取引の流れ', 'LINEでのご相談から実車査定、お支払いまで。4つのステップをご案内します。')}
<section class="section-pad"><div class="container flow-layout"><div class="flow-sidebar"><span class="eyebrow">STEP BY STEP</span><h2>お取引の流れ</h2><p>ご納得いただいたうえでご契約いただけるよう、一つひとつ丁寧に進めます。</p>${lineButton('まずはLINEで相談')}</div><ol class="flow-steps">${process.map(([no,title,text],i)=>`<li><span class="flow-symbol">${icon(processIcons[i])}</span><div><span class="flow-count">STEP ${no}</span><h3>${title}</h3><p>${text}</p></div></li>`).join('')}</ol></div></section>
<section class="section-pad light-section"><div class="container faq-preview-grid"><div>${sectionHeading('BEFORE SELLING', '売却前の疑問も、<br>まとめて解消。')}<p>ローンや車検、入金タイミングなど、よくいただくご質問を掲載しています。</p><a class="text-link" href="/faq/">よくある質問を見る ${arrow()}</a></div><div class="faq-list">${faqHtml([faq[2],faq[6],faq[5],faq[0]])}</div></div></section>${ctaBand()}`;

const store = `${pageHero('店舗・スタッフ', '津島店のスタッフ・店舗案内', 'アップルワールド津島店のスタッフとご連絡先をご案内します。')}
<section class="section-pad"><div class="container store-layout"><figure class="store-image"><img src="/assets/staff4.webp" alt="アップルワールド津島店のスタッフと車の整備スペース" loading="lazy"><figcaption>スタッフ写真 ／ 津島店</figcaption></figure><div class="store-info"><span class="eyebrow">STORE INFORMATION</span><h2>アップルワールド<br>津島店</h2><p class="operated-label">運営：ガレージ山田<br>アップルワールドFC加盟店</p><dl><div><dt>所在地</dt><dd>${address}</dd></div><div><dt>営業時間</dt><dd>10:00〜18:00</dd></div><div><dt>定休日</dt><dd>毎週木曜日</dd></div><div><dt>電話番号</dt><dd><a href="${phoneHref}">${phone}</a></dd></div></dl><a class="btn btn-dark" href="${phoneHref}">ご来店について電話で相談する ${arrow()}</a></div></div></section>
<section class="section-pad staff-gallery-section"><div class="container">${sectionHeading('津島店のスタッフ', 'スタッフのご紹介', '現在の公式サイトでご紹介している、アップルワールド津島店のスタッフ写真です。')}<div class="store-staff-grid"><figure><img src="/assets/staff1.webp" alt="女性スタッフ2名" loading="lazy"></figure><figure><img src="/assets/staff2.webp" alt="店舗スタッフ" loading="lazy"></figure><figure><img src="/assets/staff3.webp" alt="店舗スタッフ" loading="lazy"></figure><figure><img src="/assets/staff4.webp" alt="店舗スタッフ" loading="lazy"></figure></div></div></section>
<section class="section-pad light-section"><div class="container area-layout"><div>${sectionHeading('無料出張査定', '出張査定のご相談エリア')}<p>津島市を拠点とした周辺地域の出張査定についてご相談いただけます。ご利用可能なエリアはお電話・LINEでご確認ください。</p></div><div class="area-list"><span>津島市</span><span>愛西市</span><span>あま市</span><span>名古屋市中川区</span><span>名古屋市港区</span><span>桑名市</span><span>その他近隣地域</span></div></div></section>${ctaBand()}`;

const assessment = `${pageHero('LINEで無料査定', 'LINEで無料査定のご相談', '売却するか決める前でも大丈夫です。お車の情報をお知らせください。')}
<section class="section-pad"><div class="container assessment-layout"><div class="assessment-main"><span class="eyebrow">LINE・お電話で受付</span><h2>わかる範囲の情報から、<br>査定のご相談を。</h2><p>車種や年式などをLINEでお知らせください。まずは概算をご案内し、必要に応じて実車査定へ進みます。</p><div class="assessment-actions">${lineButton('LINEで無料査定を始める')}${phoneButton()}</div><p class="fineprint">※ 最終的な買取価格は実車確認後にご案内します。</p></div><div class="assessment-aside"><h3>LINEでお知らせいただく内容の目安</h3><ul><li><span>01</span><div><strong>車種・年式</strong><p>わかる範囲で結構です。</p></div></li><li><span>02</span><div><strong>走行距離</strong><p>おおよその距離でもご相談できます。</p></div></li><li><span>03</span><div><strong>お車の状態とご希望</strong><p>売却時期が未定の場合も、その旨をお知らせください。</p></div></li></ul></div></div></section>
<section class="section-pad light-section"><div class="container narrow-block">${sectionHeading('ご連絡後の流れ', 'お問い合わせ後のお手続き')}<ol class="steps-list compact">${processHtml()}</ol></div></section>${ctaBand('お電話でのご相談も受け付けています。','営業時間 10:00〜18:00 ／ 毎週木曜日定休')}`;

const faqPage = `${pageHero('FAQ', '車買取に関するよくあるご質問', '初めての車売却も、気になることを一つずつ。')}
<section class="section-pad"><div class="container faq-page-layout"><div><span class="eyebrow">QUESTIONS & ANSWERS</span><h2>査定・ご契約に<br>ついてのご質問</h2><p>掲載内容以外にも、気になることがありましたらお気軽にご連絡ください。</p></div><div class="faq-list">${faqHtml()}</div></div></section>${ctaBand()}`;

const pages = [
  ['', shell({title:'アップルワールド津島店｜津島市の車買取・無料査定', description:'津島市で車買取・無料査定ならアップルワールド津島店。ガレージ山田が運営。出張査定、ローン中の車、事故車のご相談も。中古車販売・修理・板金塗装・保険にも対応。',active:'home',body:home,home:true})],
  ['service',shell({title:'車買取・無料出張査定｜アップルワールド津島店',description:'津島市を中心とした車買取・無料出張査定。ローン中の車、事故車、不動車、車検切れの車もご相談ください。査定だけでも歓迎です。',active:'service',body:service})],
  ['support',shell({title:'中古車販売・修理・板金塗装・保険｜アップルワールド津島店',description:'アップルワールド津島店は車買取だけでなく、中古車販売、修理・整備、板金塗装、自動車保険まで対応するカーライフの相談窓口です。',active:'support',body:support})],
  ['flow',shell({title:'車買取の流れ｜アップルワールド津島店',description:'LINE査定から概算査定、実車査定・ご契約、お支払いまで。初めての方にもわかりやすいアップルワールド津島店の車買取の流れ。',active:'flow',body:flow})],
  ['store',shell({title:'店舗情報・スタッフ・出張エリア｜アップルワールド津島店',description:'アップルワールド津島店のスタッフと店舗のご案内。所在地は愛知県津島市百島町字三正六歩29-2。津島市・愛西市・あま市など近隣地域の無料出張査定もご相談ください。',active:'store',body:store})],
  ['assessment',shell({title:'LINE無料査定｜アップルワールド津島店',description:'津島市のアップルワールド津島店。LINEから車種・年式などの情報を送って無料査定のご相談。出張査定も無料、売却未定でもお気軽に。',active:'assessment',body:assessment})],
  ['faq',shell({title:'車買取のよくある質問｜アップルワールド津島店',description:'ローン中の車や車検切れの車は売れる？査定だけでも大丈夫？アップルワールド津島店の車買取に関するよくある質問。',active:'faq',body:faqPage})],
];

for (const [slug, html] of pages) {
  const dir = join(output.pathname, slug);
  await mkdir(dir, {recursive:true});
  await writeFile(join(dir,'index.html'), html, 'utf8');
}
await writeFile(join(output.pathname,'robots.txt'), 'User-agent: *\nDisallow: /\n', 'utf8');
console.log(`Generated ${pages.length} pages`);
