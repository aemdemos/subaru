let flag = true;
function handleEvents() {
    if (!flag) {
        return;
    }
    flag = false;
    const divs = document.querySelectorAll('body > main > div.section.customer-options.columns-container > div > div > div > div');
    const headings = [], description = [];
    divs.forEach((div) => {
      headings.push(div.querySelector('h2').innerText);
      description.push(div.querySelector('p').innerText);
    });
    const wrapper = document.querySelector('body > main > div.section.customer-options.columns-container > div');
    wrapper.innerHTML = '<ul class="navigation_003__container animated-element clean"><li id="navigation_003__kpi-1" kpiid="1" data-order="1" class="navigation_003__kpi navigation_003__kpi--tall navigation_003__kpi--active"><a title="Build your perfect Subaru with our easy, online tools." tabindex="0" href="/build.html" data-soa-analytics-link-name="Build &amp; Price" data-soa-analytics-link-type="003_navigation:kpi_link:id_1:order_1" class="navigation_003__kpi-link"><div class="navigation_003__kpi-icon"><div class="navigation_003__loading"><div class="navigation_003__inner-shadow"></div> <div class="navigation_003__border-shadow"></div> <div class="navigation_003__hold navigation_003__hold--left"><div class="navigation_003__fill"></div></div> <div class="navigation_003__hold navigation_003__hold--right"><div class="navigation_003__fill"></div></div> <svg role="presentation" data-name="Right Arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="1" height="1" class="navigation_003__kpi-svg"><polyline role="presentation" points="8.14 3.77 16.86 12.5 8.14 21.23" class="icon-path icon-path--midnight"></polyline></svg></div></div> <div class="navigation_003__kpi-content"><span class="navigation_003__kpi-title">Build &amp; Price</span> <p class="navigation_003__kpi-description fs-small s-text-white pb-0">\n' + '                Build your perfect Subaru with our easy, online tools.\n' + '              </p></div></a> <div class="navigation_003__kpi-overlay"></div></li><li id="navigation_003__kpi-2" kpiid="2" data-order="2" class="navigation_003__kpi navigation_003__kpi--tall"><a title="Explore the discount and incentive programs available for qualified buyers." tabindex="0" href="/shopping-tools/special-offers.html" data-soa-analytics-link-name="Special Offers" data-soa-analytics-link-type="003_navigation:kpi_link:id_2:order_2" class="navigation_003__kpi-link"><div class="navigation_003__kpi-icon"><div class="navigation_003__loading"><div class="navigation_003__inner-shadow"></div> <div class="navigation_003__border-shadow"></div> <div class="navigation_003__hold navigation_003__hold--left"><div class="navigation_003__fill"></div></div> <div class="navigation_003__hold navigation_003__hold--right"><div class="navigation_003__fill"></div></div> <svg role="presentation" data-name="Right Arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="1" height="1" class="navigation_003__kpi-svg"><polyline role="presentation" points="8.14 3.77 16.86 12.5 8.14 21.23" class="icon-path icon-path--midnight"></polyline></svg></div></div> <div class="navigation_003__kpi-content"><span class="navigation_003__kpi-title">Special Offers</span> <p class="navigation_003__kpi-description fs-small s-text-white pb-0">\n' + '                Explore the discount and incentive programs available for qualified buyers.\n' + '              </p></div></a> <div class="navigation_003__kpi-overlay"></div></li><li id="navigation_003__kpi-3" kpiid="3" data-order="3" class="navigation_003__kpi navigation_003__kpi--tall"><a title="Find the Subaru model with the exact features and colors you\'re looking for." tabindex="0" href="/vehicles/local-inventory.html" data-soa-analytics-link-name="Local Inventory" data-soa-analytics-link-type="003_navigation:kpi_link:id_3:order_3" class="navigation_003__kpi-link"><div class="navigation_003__kpi-icon"><div class="navigation_003__loading"><div class="navigation_003__inner-shadow"></div> <div class="navigation_003__border-shadow"></div> <div class="navigation_003__hold navigation_003__hold--left"><div class="navigation_003__fill"></div></div> <div class="navigation_003__hold navigation_003__hold--right"><div class="navigation_003__fill"></div></div> <svg role="presentation" data-name="Right Arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="1" height="1" class="navigation_003__kpi-svg"><polyline role="presentation" points="8.14 3.77 16.86 12.5 8.14 21.23" class="icon-path icon-path--midnight"></polyline></svg></div></div> <div class="navigation_003__kpi-content"><span class="navigation_003__kpi-title">Local Inventory</span> <p class="navigation_003__kpi-description fs-small s-text-white pb-0">\n' + '                Find the Subaru model with the exact features and colors you\'re looking for.\n' + '              </p></div></a> <div class="navigation_003__kpi-overlay"></div></li><li id="navigation_003__kpi-4" kpiid="4" data-order="4" class="navigation_003__kpi navigation_003__kpi--tall"><a title="Locate and get directions to a retailer near you with the services you need." tabindex="0" href="/retailer.html" data-soa-analytics-link-name="Find a Retailer" data-soa-analytics-link-type="003_navigation:kpi_link:id_4:order_4" class="navigation_003__kpi-link"><div class="navigation_003__kpi-icon"><div class="navigation_003__loading"><div class="navigation_003__inner-shadow"></div> <div class="navigation_003__border-shadow"></div> <div class="navigation_003__hold navigation_003__hold--left"><div class="navigation_003__fill"></div></div> <div class="navigation_003__hold navigation_003__hold--right"><div class="navigation_003__fill"></div></div> <svg role="presentation" data-name="Right Arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" width="1" height="1" class="navigation_003__kpi-svg"><polyline role="presentation" points="8.14 3.77 16.86 12.5 8.14 21.23" class="icon-path icon-path--midnight"></polyline></svg></div></div> <div class="navigation_003__kpi-content"><span class="navigation_003__kpi-title">Find a Retailer</span> <p class="navigation_003__kpi-description fs-small s-text-white pb-0">\n' + '                Locate and get directions to a retailer near you with the services you need.\n' + '              </p></div></a> <div class="navigation_003__kpi-overlay"></div></li></ul>';
    const index = 0;
    const items = document.querySelectorAll('body > main > div.section.customer-options.columns-container > div > ul li');
    items.forEach((item, index) => {
      const headingSpan = item.querySelector('a > div.navigation_003__kpi-content > span');
      if (headingSpan) {
        headingSpan.innerText = headings[index];
      }
      const descriptionSpan = item.querySelector('a > div.navigation_003__kpi-content > p');
      if (descriptionSpan) {
        descriptionSpan.innerText = description[index];
      }
      items[0].classList.add('navigation_003__kpi--hover');
      item.onmouseover = () => {
        items.forEach((i) => {
          i.classList.remove('navigation_003__kpi--hover');
        });
        item.classList.add('navigation_003__kpi--hover');
      }
      item.onmouseout = () => {
        item.classList.remove('navigation_003__kpi--hover');
      }
    });
    const lists = document.querySelector('body > main > div.section.customer-options.columns-container > div > ul');
    lists.onmouseout = () => {
        lists.children[0].classList.add('navigation_003__kpi--hover');
    }

    const anchors = document.querySelectorAll('.customer-options a');
    anchors.forEach((anchor, index) => {
       anchor.href = `https://www.subaru.com${new URL(anchor.href).pathname}`;
    });
}

let flagReports = true;
function handleReportsEvents() {
    if (!flagReports) {
        return;
    }
    flagReports = false;
    const reportSection = document.querySelector('.customer-reports');
    const divs = document.querySelectorAll('body > main > div.section.customer-reports.columns-container > div > div > div > div');
    const h2 = document.querySelector('#read-our-consumer-reports-reviews');
    const reportsP = document.querySelector('body > main > div.section.customer-reports.columns-container > div > div > div > div:nth-child(2) > p:nth-child(2)');
    const button = document.querySelector('body > main > div.section.customer-reports.columns-container > div > div > div > div:nth-child(2) > p.button-container');

    [...divs, h2, reportsP, button].forEach((el) => {
        el.classList.add('animated-element');
    });
}
export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
  handleEvents();
  handleReportsEvents();
}
