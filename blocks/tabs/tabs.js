// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';

function hasWrapper(el) {
    return !!el.firstElementChild && window.getComputedStyle(el.firstElementChild).display === 'block';
}

function addEventListeners() {
    const tabsWrapper = document.querySelector('body > main > div.section.vehicle-categories.tabs-container > div');
    tabsWrapper.classList.add('animated-element');
    const tabs = document.querySelectorAll('.tabs-tab');
    // navigator.style.width = tabs[0].clientWidth + 'px';
    const panels = document.querySelectorAll('.tabs-panel');
    const defaultTab = document.getElementById("tab-suvs");
    defaultTab.classList.add("active");
    panels[0].classList.add("active-panel");
    panels.forEach((panel, index) => {
        if (index !== 0)
            panel.classList.add("inactive-panel");
    });
    tabs.forEach((tab, index) => {
        tab.addEventListener("click", function() {
            const navigator = document.querySelector('.tabs-navigator');
            const offset = index * tab.clientWidth;
            navigator.style.transform= `translateX(${offset}px)`;
            tabs.forEach(t => {
                t.classList.remove("active");
            });
            panels.forEach((panel, index) => {
                if (panel.classList.contains("active-panel")) {
                    panel.classList.remove("active-panel");
                    panel.classList.add("inactive-panel");
                }
            });
            tab.classList.add("active");
            panels[index].classList.remove('inactive-panel');
            panels[index].classList.add('active-panel');
        });
    });

    const tabItems = document.querySelectorAll('.vehicle-categories .tabs-panel > div > div');
    tabItems.forEach(tabItem => {
        tabItem.onmouseover = function() {
            tabItems.forEach(t => t.style.opacity = 0.5);
            tabItem.style.opacity = 1;
        };
        tabItem.onmouseout = function() {
            tabItems.forEach(t => t.style.opacity = 1);
        };
    });
    setTimeout(addNavigator, 10);
}

function addNavigator() {
    const tabsList = document.querySelector('.tabs-list');
    if (tabsList.clientHeight === 0) {
        setTimeout(addNavigator, 10);
        return;
    }
    const navigator = document.createElement('div');
    navigator.classList.add('tabs-navigator');
    navigator.style.top = `${tabsList.clientHeight - 1}px`;
    navigator.style.width = `${tabsList.children[0].clientWidth}px`;
    tabsList.appendChild(navigator);
}

function decorateTabsPanels() {
    const panels = document.querySelectorAll('.tabs-panel');
    panels.forEach((panel) => {
        const parentDiv = panel.children[0];
        let newDiv = document.createElement('div');
        [...parentDiv.children].forEach((child) => {
            if (child.tagName === 'HR') {
                child.remove();
                parentDiv.appendChild(newDiv);
                newDiv = document.createElement('div');
            } else {
                newDiv.appendChild(child);
            }
        });
        if (newDiv) {
            parentDiv.appendChild(newDiv);
        }
    });
}

export default async function decorate(block) {
    // build tablist
    const tablist = document.createElement('div');
    tablist.className = 'tabs-list';
    tablist.setAttribute('role', 'tablist');

    // decorate tabs and tabpanels
    const tabs = [...block.children].map((child) => child.firstElementChild);
    tabs.forEach((tab, i) => {
        const id = toClassName(tab.textContent);

        // decorate tabpanel
        const tabpanel = block.children[i];
        tabpanel.className = 'tabs-panel';
        tabpanel.id = `tabpanel-${id}`;
        tabpanel.setAttribute('aria-hidden', !!i);
        tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
        tabpanel.setAttribute('role', 'tabpanel');
        if (!hasWrapper(tabpanel.lastElementChild)) {
            tabpanel.lastElementChild.innerHTML = `<p>${tabpanel.lastElementChild.innerHTML}</p>`;
        }

        // build tab button
        const button = document.createElement('button');
        button.className = 'tabs-tab';
        button.id = `tab-${id}`;
        button.innerHTML = tab.innerHTML;
        button.setAttribute('aria-controls', `tabpanel-${id}`);
        button.setAttribute('aria-selected', !i);
        button.setAttribute('role', 'tab');
        button.setAttribute('type', 'button');
        button.addEventListener('click', () => {
            block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
                panel.setAttribute('aria-hidden', true);
            });
            tablist.querySelectorAll('button').forEach((btn) => {
                btn.setAttribute('aria-selected', false);
            });
            tabpanel.setAttribute('aria-hidden', false);
            button.setAttribute('aria-selected', true);
        });
        tablist.append(button);
        tab.remove();
    });
    block.prepend(tablist);
    decorateTabsPanels();
    addEventListeners();
}
