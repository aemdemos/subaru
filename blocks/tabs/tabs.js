// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';

function hasWrapper(el) {
    return !!el.firstElementChild && window.getComputedStyle(el.firstElementChild).display === 'block';
}

function addEventListeners() {
    const tabs = document.querySelectorAll('.tabs-tab');
    const defaultTab = document.getElementById("tab-suvs");
    defaultTab.classList.add("active");
    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            let oldIndex;
            tabs.forEach(t => {
                if (t.classList.contains('active')) {
                    oldIndex = [...tabs].indexOf(t);
                }
                t.classList.remove("active")
            });
            tab.classList.add("active");
            let newIndex = [...tabs].indexOf(tab);
            document.querySelectorAll('.tabs-panel')[oldIndex].opacity = 0;
            document.querySelectorAll('.tabs-panel')[newIndex].opacity = 1;
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
