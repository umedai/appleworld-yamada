import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const output = new URL('./dist/', import.meta.url);
const line = 'https://line.me/R/ti/p/@329fogkk';
const phone = '0567-69-4600';
const phoneHref = 'tel:0567694600';
const address = '愛知県津島市百島町字三正六歩29-2';
const storeImage = '/assets/storefront.webp';
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
  return `<footer class="footer"><div class="container"><div class="footer-main"><div class="footer-about"><p class="footer-eyebrow">TSUSHIMA / AICHI</p><div class="footer-brand">アップルワールド<span>津島店</span></div><p>クルマのことを、地元で相談できる場所へ。</p><p class="operated">運営：ガレージ山田<br>アップルワールドFC加盟店</p></div><div class="footer-links"><h3>ご案内</h3><a href="/service/">車買取・無料査定</a><a href="/support/">中古車販売・修理・板金・保険</a><a href="/flow/">買取までの流れ</a><a href="/faq/">よくある質問</a><a href="/assessment/">LINEで査定相談</a></div><div class="footer-contact"><h3>店舗情報</h3><p>〒496-0019<br>${address}</p><p>10:00〜18:00 ／ 毎週木曜日定休</p><a class="footer-phone" href="${phoneHref}">${phone}</a><a class="footer-map" href="https://www.google.com/maps/search/?api=1&query=%E6%84%9B%E7%9F%A5%E7%9C%8C%E6%B4%A5%E5%B3%B6%E5%B8%82%E7%99%BE%E5%B3%B6%E7%94%BA%E5%AD%97%E4%B8%89%E6%AD%A3%E5%85%AD%E6%AD%A929-2" target="_blank" rel="noopener noreferrer">Google マップで見る ↗</a></div></div><div class="footer-bottom"><span>© 2026 Garage Yamada / Apple World Tsushima</span><span>愛知県津島市・百島町</span></div></div></footer>
  <div class="mobile-actions"><a href="${phoneHref}" class="mobile-phone">電話で相談</a><a href="${line}" target="_blank" rel="noopener noreferrer" class="mobile-line">LINEで無料査定 ↗</a></div>`;
}
function shell({ title, description, active, body, home = false }) {
  const jsonLd = home ? `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org', '@type': 'AutoDealer',
    name: 'アップルワールド津島店',
    description: 'ガレージ山田が運営する、愛知県津島市の車買取・中古車販売・修理・板金塗装・自動車保険の相談窓口。',
    url: 'https://appleworld-yamada.jp/',
    telephone: '+81-567-69-4600',
    address: {'@type':'PostalAddress', postalCode:'496-0019', addressRegion:'愛知県', addressLocality:'津島市', streetAddress:'百島町字三正六歩29-2', addressCountry:'JP'},
    openingHoursSpecification: [{ '@type':'OpeningHoursSpecification', dayOfWeek:['Monday','Tuesday','Wednesday','Friday','Saturday','Sunday'], opens:'10:00', closes:'18:00'}],
    areaServed:['津島市','愛西市','あま市','名古屋市中川区','名古屋市港区','桑名市']
  })}</script>` : '';
  return `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#25272a"><meta name="robots" content="noindex,nofollow"><title>${title}</title><meta name="description" content="${description}"><meta property="og:type" content="website"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><link rel="stylesheet" href="/assets/style.css">${home ? '<link rel="preload" as="image" href="/assets/storefront.webp" fetchpriority="high">' : ''}${jsonLd}</head><body class="${home ? 'home' : 'interior'}">${header(active)}<main id="main">${body}</main>${footer()}<script src="/assets/site.js" defer></script></body></html>`;
}

const benefitCards = [
  { num:'01',title:'独自の販路を活かした査定',text:'卸売・業販・オークションなどの販路を活かし、一台一台の価値を丁寧に見極めます。' },
  { num:'02',title:'査定後の不当な減額なし',text:'ご契約後に一方的な理由で金額を変えるような対応はいたしません。' },
  { num:'03',title:'無理な営業をしません',text:'査定のみ、売却時期が未定のご相談も歓迎です。しつこい電話営業は行いません。' },
  { num:'04',title:'売却後までワンストップ',text:'中古車販売・修理・板金塗装・自動車保険まで、次のカーライフもご相談いただけます。' },
];
const benefitHtml = benefitCards.map(x=>`<article class="benefit-card"><span class="benefit-no">${x.num}</span><h3>${x.title}</h3><p>${x.text}</p></article>`).join('');

const process = [
  ['01','LINEで査定のご相談','車種・年式など、お車の情報をLINEでお送りください。'],
  ['02','概算の査定額をご案内','いただいた内容をもとに、概算の査定額をお調べします。'],
  ['03','実車査定・ご契約','査定額にご納得いただいてから実車を確認。ご希望に応じて売却手続きへ進みます。'],
  ['04','お車のお引き取り・お支払い','必要書類とお車が揃い次第、最短即日のお振り込みにも対応します。'],
];
function processHtml() {return process.map(([no,title,text])=>`<li class="step-card"><span class="step-no">${no}</span><div><h3>${title}</h3><p>${text}</p></div></li>`).join('');}

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
<section class="hero">
  <div class="container hero-grid">
    <figure class="hero-photo"><img src="/assets/storefront.webp" width="1914" height="1210" alt="アップルワールド津島店の実際の店舗とスタッフ" fetchpriority="high"><figcaption>私たちの店舗とスタッフです。</figcaption></figure>
    <div class="hero-message">
      <span class="hero-local">愛知県津島市・百島町</span>
      <h1>車を売る前に、<br><span>話してみませんか。</span></h1>
      <p>売ると決めていなくても、査定だけでも。<br>津島市の実店舗で、お車のご相談をお受けしています。</p>
      <div class="hero-actions">${lineButton('LINEで無料査定')}<a class="hero-call" href="${phoneHref}">電話で相談 <strong>${phone}</strong></a></div>
      <p class="hero-note">運営：ガレージ山田 ／ アップルワールドFC加盟店</p>
    </div>
  </div>
  <div class="container hero-bottom"><span>APPLE WORLD / TSUSHIMA</span><a href="/store/">店舗を詳しく見る <span aria-hidden="true">→</span></a></div>
</section>
<section class="intro-strip"><div class="container intro-strip-inner"><strong>無料査定・出張査定のご相談受付中</strong><span>受付時間 10:00〜18:00 ／ 毎週木曜日定休</span><a href="/flow/">査定の流れを見る <span aria-hidden="true">→</span></a></div></section>
<section class="section-pad offer-section"><div class="container">
  <div class="offer-heading"><div><p class="eyebrow">01 / ご相談できること</p><h2>車買取から、<br>その先のカーライフまで。</h2></div><p>買取が中心の店舗ですが、乗り換え先の車探しや修理のご相談にも対応しています。お車のことを、ひとつの窓口で。</p></div>
  <div class="offer-grid">
    <a class="offer-main" href="/service/"><div class="offer-main-photo"><img src="/assets/garage-yamada-car.webp" alt="ガレージ山田で撮影した実車" loading="lazy"></div><div class="offer-main-body"><span class="offer-number">01 / メインサービス</span><h3>車買取・無料査定</h3><p>査定だけ、まだ迷っている、ローンが残っている。まずは状況をお聞かせください。</p><span class="offer-link">買取サービスの詳細 <span aria-hidden="true">→</span></span></div></a>
    <div class="offer-list"><p class="offer-list-caption">ほかにも、こんなことをご相談いただけます。</p><a href="/support/#sales"><span>02</span><strong>中古車販売</strong><small>次の一台のご相談</small><b aria-hidden="true">↗</b></a><a href="/support/#maintenance"><span>03</span><strong>修理・整備</strong><small>日々のメンテナンスや不調</small><b aria-hidden="true">↗</b></a><a href="/support/#bodywork"><span>04</span><strong>板金塗装</strong><small>傷やへこみのご相談</small><b aria-hidden="true">↗</b></a><a href="/support/#insurance"><span>05</span><strong>自動車保険</strong><small>お車の保険のご相談</small><b aria-hidden="true">↗</b></a></div>
  </div>
</div></section>
<section class="section-pad conversations-section"><div class="container">
  <div class="conversations-grid"><div><p class="eyebrow">02 / 車を手放すとき</p><h2>こんなご相談からで、<br>大丈夫です。</h2><p>はじめての査定でも、お乗り換えを検討中でも。気になることを一緒に整理していきます。</p><a class="text-link" href="/faq/">ほかのご質問も見る <span aria-hidden="true">→</span></a></div>
  <div class="conversation-list"><a href="/faq/"><span>Q.</span><strong>まだ売るか決めていないのですが？</strong><b aria-hidden="true">→</b></a><a href="/faq/"><span>Q.</span><strong>ローンが残っている車でも大丈夫？</strong><b aria-hidden="true">→</b></a><a href="/faq/"><span>Q.</span><strong>車検切れ・動かない車も相談できる？</strong><b aria-hidden="true">→</b></a><a href="/faq/"><span>Q.</span><strong>査定だけでも無料ですか？</strong><b aria-hidden="true">→</b></a></div></div>
</div></section>
<section class="section-pad people-section"><div class="container">
  <div class="people-heading"><div><p class="eyebrow">03 / お店の人たち</p><h2>お話を伺うのは、<br>ここで働く私たちです。</h2></div><p>写真はアップルワールド津島店のスタッフ。スタッフの顔が見える地元の店舗として、お車のご相談をお待ちしています。</p></div>
  <div class="people-editorial"><figure class="people-feature"><img src="/assets/staff2.webp" alt="アップルワールド津島店の男性スタッフ" loading="lazy"><figcaption>津島店のスタッフ</figcaption></figure><div class="people-side"><figure><img src="/assets/staff1.webp" alt="アップルワールド津島店の女性スタッフ2名" loading="lazy"><figcaption>店舗スタッフ</figcaption></figure><a href="/store/">スタッフと店舗のご紹介 <span aria-hidden="true">→</span></a></div></div>
</div></section>
<section class="section-pad process-section"><div class="container process-grid"><div class="process-intro"><p class="eyebrow">04 / 売却の流れ</p><h2>ご相談から、<br>お支払いまで。</h2><p>LINEでのご相談から実車査定、お引き取りまで。流れをご案内します。</p><a class="text-link" href="/flow/">詳しい流れを見る <span aria-hidden="true">→</span></a></div><ol class="steps-list">${processHtml()}</ol></div></section>
<section class="section-pad visit-section"><div class="container visit-grid"><div class="visit-text"><p class="eyebrow">05 / 店舗へのアクセス</p><h2>津島市百島町の、<br>このお店です。</h2><p>アップルワールド津島店<br>〒496-0019 ${address}</p><dl><div><dt>営業時間</dt><dd>10:00〜18:00</dd></div><div><dt>定休日</dt><dd>毎週木曜日</dd></div><div><dt>電話番号</dt><dd><a href="${phoneHref}">${phone}</a></dd></div></dl><a class="text-link" href="/store/">アクセスと出張査定エリア <span aria-hidden="true">→</span></a></div><figure class="visit-image"><img src="/assets/storefront.webp" alt="アップルワールド津島店の外観" loading="lazy"></figure></div></section>
<section class="section-pad faq-preview"><div class="container faq-preview-grid"><div><p class="eyebrow">06 / よくあるご質問</p><h2>ご相談の前に、<br>気になること。</h2><p>査定や売却のよくある質問をまとめています。</p><a class="text-link" href="/faq/">すべての質問を見る <span aria-hidden="true">→</span></a></div><div class="faq-list">${faqHtml(faq.slice(0,4))}</div></div></section>
${ctaBand()}`;

const service = `${pageHero('BUYING SERVICE', '車買取・無料査定のご案内', '津島市を拠点に無料査定・出張査定に対応。お車の価値を丁寧に見極めます。')}
<section class="section-pad"><div class="container statement-grid"><span class="eyebrow">FOR YOUR CAR</span><div><h2 class="section-large">「まずは価値を知りたい」<br>その気持ちからで大丈夫。</h2><p>車の売却には、価格だけでなく、タイミングや手続きへの不安もつきものです。当店では、お車の状態やお客様のご希望を伺いながら、納得できるお取引を目指します。</p><div class="chip-list"><span>普通車・軽自動車</span><span>ローン中の車</span><span>事故車・故障車</span><span>不動車・車検切れ</span><span>カスタム車</span></div></div></div></section>
<section class="section-pad light-section"><div class="container">${sectionHeading('OUR STRENGTHS', '査定の安心を支える、4つの強み。')}<div class="benefit-grid">${benefitHtml}</div></div></section>
<section class="section-pad"><div class="container narrow-block">${sectionHeading('SERVICE AREA', '津島市を中心に、近隣地域にも出張。', '津島市・愛西市・あま市・名古屋市中川区／港区・桑名市、その他近隣地域にも対応しています。')}<div class="area-banner"><span>無料出張査定について</span><p>出張が可能かどうかは地域・状況によりご案内します。LINEまたはお電話でお気軽にお問い合わせください。</p>${lineButton('出張査定を相談する')}</div></div></section>${ctaBand()}`;

const supportServices = [
 ['sales','01','中古車販売','次の一台も、同じ窓口で。','買取だけでなく、中古車の販売にも対応しています。ライフスタイルやご予算に合わせたお乗り換えについてご相談ください。'],
 ['maintenance','02','修理・整備','いつもの安心を、これからも。','車の不調や日々のメンテナンスなど、購入後のカーライフについてもご相談いただけます。'],
 ['bodywork','03','板金塗装','傷やへこみの相談も。','ボディの傷やへこみ、鈑金塗装についても対応しています。車の状態に合わせてご案内します。'],
 ['insurance','04','自動車保険','もしもの備えまで、身近に。','自動車保険のご相談にも対応。お車に関することを一つの窓口でご相談いただけます。'],
];
const support = `${pageHero('CAR LIFE SUPPORT', '販売・修理・板金・保険もご相談ください。', '中古車販売・修理・整備・板金塗装・自動車保険まで、幅広く対応します。')}
<section class="section-pad"><div class="container"><div class="section-head centered"><span class="eyebrow">ONE STOP SERVICE</span><h2>お車に関するご相談を、<br>ひとつの窓口に。</h2><p>運営元のガレージ山田が、車買取から乗り換え・アフターサービスまでご案内します。</p></div><div class="support-list">${supportServices.map(([id,no,title,tagline,desc])=>`<article class="support-row" id="${id}"><span class="support-number">${no}</span><div><span class="eyebrow">CAR LIFE SERVICE</span><h3>${title}</h3></div><div><strong>${tagline}</strong><p>${desc}</p></div><a class="round-link" href="/assessment/" aria-label="${title}を相談する">↗</a></article>`).join('')}</div><div class="notice-note">※ 各サービスの対応内容や料金はお車の状態・ご相談内容により異なります。詳しくはお問い合わせください。</div></div></section>${ctaBand('売却も、乗り換えも。お気軽にご相談ください。','お車に関するお悩みを、まとめてご相談いただけます。')}`;

const flow = `${pageHero('OUR PROCESS', '車買取のお取引の流れ', 'LINEでのご相談から実車査定、お支払いまで。4つのステップをご案内します。')}
<section class="section-pad"><div class="container flow-layout"><div class="flow-sidebar"><span class="eyebrow">STEP BY STEP</span><h2>お取引の流れ</h2><p>ご納得いただいたうえでご契約いただけるよう、一つひとつ丁寧に進めます。</p>${lineButton('まずはLINEで相談')}</div><ol class="flow-steps">${process.map(([no,title,text])=>`<li><div class="flow-count">STEP ${no}</div><div><h3>${title}</h3><p>${text}</p></div></li>`).join('')}</ol></div></section>
<section class="section-pad light-section"><div class="container faq-preview-grid"><div>${sectionHeading('BEFORE SELLING', '売却前の疑問も、<br>まとめて解消。')}<p>ローンや車検、入金タイミングなど、よくいただくご質問を掲載しています。</p><a class="text-link" href="/faq/">よくある質問を見る ${arrow()}</a></div><div class="faq-list">${faqHtml([faq[2],faq[6],faq[5],faq[0]])}</div></div></section>${ctaBand()}`;

const store = `${pageHero('STORE & ACCESS', '店舗・スタッフ・アクセス', 'アップルワールド津島店の店舗情報と出張査定の対応地域をご案内します。')}
<section class="section-pad"><div class="container store-layout"><div class="store-image"><img src="${storeImage}" alt="アップルワールド津島店の店舗外観" loading="lazy"></div><div class="store-info"><span class="eyebrow">STORE INFORMATION</span><h2>アップルワールド<br>津島店</h2><p class="operated-label">運営：ガレージ山田<br>アップルワールドFC加盟店</p><dl><div><dt>所在地</dt><dd>〒496-0019<br>${address}</dd></div><div><dt>営業時間</dt><dd>10:00〜18:00</dd></div><div><dt>定休日</dt><dd>毎週木曜日</dd></div><div><dt>電話番号</dt><dd><a href="${phoneHref}">${phone}</a></dd></div></dl><a class="btn btn-dark" href="https://www.google.com/maps/search/?api=1&query=%E6%84%9B%E7%9F%A5%E7%9C%8C%E6%B4%A5%E5%B3%B6%E5%B8%82%E7%99%BE%E5%B3%B6%E7%94%BA%E5%AD%97%E4%B8%89%E6%AD%A3%E5%85%AD%E6%AD%A929-2" target="_blank" rel="noopener noreferrer">地図アプリで開く ${arrow()}</a></div></div></section>
<section class="section-pad staff-gallery-section"><div class="container">${sectionHeading('MEET THE TEAM', 'スタッフのご紹介', '現在の公式サイトでご紹介している、アップルワールド津島店のスタッフ写真です。')}<div class="store-staff-grid"><figure><img src="/assets/staff1.webp" alt="女性スタッフ2名" loading="lazy"></figure><figure><img src="/assets/staff2.webp" alt="店舗スタッフ" loading="lazy"></figure><figure><img src="/assets/staff3.webp" alt="店舗スタッフ" loading="lazy"></figure><figure><img src="/assets/staff4.webp" alt="店舗スタッフ" loading="lazy"></figure></div></div></section>
<section class="section-pad light-section"><div class="container area-layout"><div>${sectionHeading('VISITING AREA', '出張査定の対応エリア')}<p>津島市を拠点に、周辺地域のお客様にもご相談いただいています。記載以外の近隣地域についてもお問い合わせください。</p></div><div class="area-list"><span>津島市全域</span><span>愛西市</span><span>あま市</span><span>名古屋市中川区</span><span>名古屋市港区</span><span>桑名市</span><span>その他近隣地域</span></div></div></section>${ctaBand()}`;

const assessment = `${pageHero('FREE ASSESSMENT', 'LINEで無料査定のご相談', '売るかどうか決める前でも大丈夫。お車の情報を送るだけでご相談を始められます。')}
<section class="section-pad"><div class="container assessment-layout"><div class="assessment-main"><span class="eyebrow">START WITH LINE</span><h2>お車の情報を送って、<br>無料で査定相談。</h2><p>車種や年式などの情報をLINEでお送りいただくと、概算の査定額をご案内します。ご納得いただいてから実車査定へ進む流れです。</p><div class="assessment-actions">${lineButton('LINEで無料査定を始める')}${phoneButton()}</div><p class="fineprint">※ 最終的な買取価格は実車確認後にご案内します。</p></div><div class="assessment-aside"><h3>相談しやすい3つの理由</h3><ul><li><span>01</span><div><strong>出張も査定も無料</strong><p>対応エリア内の出張査定も無料です。</p></div></li><li><span>02</span><div><strong>無理な営業なし</strong><p>売却時期が決まっていなくてもご相談できます。</p></div></li><li><span>03</span><div><strong>ローン中も相談可能</strong><p>所有権や残債のお手続きもご案内します。</p></div></li></ul></div></div></section>
<section class="section-pad light-section"><div class="container narrow-block">${sectionHeading('AFTER CONTACT', 'お問い合わせ後の流れ')}<ol class="steps-list compact">${processHtml()}</ol></div></section>${ctaBand('お電話でのご相談も受け付けています。','営業時間 10:00〜18:00 ／ 毎週木曜日定休')}`;

const faqPage = `${pageHero('FAQ', '車買取に関するよくあるご質問', '初めての車売却も、気になることを一つずつ。')}
<section class="section-pad"><div class="container faq-page-layout"><div><span class="eyebrow">QUESTIONS & ANSWERS</span><h2>査定・ご契約に<br>ついてのご質問</h2><p>掲載内容以外にも、気になることがありましたらお気軽にご連絡ください。</p></div><div class="faq-list">${faqHtml()}</div></div></section>${ctaBand()}`;

const pages = [
  ['', shell({title:'アップルワールド津島店｜津島市の車買取・無料査定', description:'津島市で車買取・無料査定ならアップルワールド津島店。ガレージ山田が運営。出張査定、ローン中の車、事故車のご相談も。中古車販売・修理・板金塗装・保険にも対応。',active:'home',body:home,home:true})],
  ['service',shell({title:'車買取・無料出張査定｜アップルワールド津島店',description:'津島市を中心とした車買取・無料出張査定。ローン中の車、事故車、不動車、車検切れの車もご相談ください。査定だけでも歓迎です。',active:'service',body:service})],
  ['support',shell({title:'中古車販売・修理・板金塗装・保険｜アップルワールド津島店',description:'アップルワールド津島店は車買取だけでなく、中古車販売、修理・整備、板金塗装、自動車保険まで対応するカーライフの相談窓口です。',active:'support',body:support})],
  ['flow',shell({title:'車買取の流れ｜アップルワールド津島店',description:'LINE査定から概算査定、実車査定・ご契約、お支払いまで。初めての方にもわかりやすいアップルワールド津島店の車買取の流れ。',active:'flow',body:flow})],
  ['store',shell({title:'店舗情報・出張エリア｜アップルワールド津島店',description:'アップルワールド津島店の店舗案内。愛知県津島市百島町字三正六歩29-2。津島市・愛西市・あま市など近隣地域の無料出張査定もご相談ください。',active:'store',body:store})],
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
