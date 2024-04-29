import { fetchPlaceholders } from '../../scripts/aem.js';

function updateActiveSlide(slide) {
    const block = slide.closest('.hero-carousel');
    const slideIndex = parseInt(slide.dataset.slideIndex, 10);
    block.dataset.activeSlide = slideIndex;

    const slides = block.querySelectorAll('.hero-carousel-slide');

    slides.forEach((aSlide, idx) => {
        aSlide.setAttribute('aria-hidden', idx !== slideIndex);
        aSlide.querySelectorAll('a').forEach((link) => {
            if (idx !== slideIndex) {
                link.setAttribute('tabindex', '-1');
            } else {
                link.removeAttribute('tabindex');
            }
        });
    });

    const indicators = block.querySelectorAll('.hero-carousel-slide-indicator');
    indicators.forEach((indicator, idx) => {
        if (idx !== slideIndex) {
            indicator.querySelector('button').removeAttribute('disabled');
        } else {
            indicator.querySelector('button').setAttribute('disabled', 'true');
        }
    });
}
function showSlide(block, slideIndex = 0) {
    const slides = block.querySelectorAll('.hero-carousel-slide');
    let realSlideIndex = slideIndex < 0 ? slides.length - 1 : slideIndex;
    if (slideIndex >= slides.length) realSlideIndex = 0;
    const activeSlide = slides[realSlideIndex];

    activeSlide.querySelectorAll('a').forEach((link) => link.removeAttribute('tabindex'));
    const slideObserver = document.querySelectorAll('body > main > div.section.hero-carousel-container > div > div > nav > ol > li button');
    slideObserver.forEach((slide) => {
        slide.classList.remove('active-observer');
    });
    slideObserver[realSlideIndex].classList.add('active-observer');
    const slidesWrapper = block.querySelector('.hero-carousel-slides');
    slidesWrapper.scrollTo({
        top: 0,
        left: activeSlide.offsetLeft,
        behavior: 'smooth',
    });
}

function bindEvents(block) {
    const slideIndicators = block.querySelector('.hero-carousel-slide-indicators');
    if (!slideIndicators) return;
    const active = block.querySelector('ol.hero-carousel-slide-indicators > li:nth-child(1) > button');
    active.classList.add('active-observer');
    active.classList.add('animate');
    slideIndicators.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', (e) => {
            const slideIndicator = e.currentTarget.parentElement;
            showSlide(block, parseInt(slideIndicator.dataset.targetSlide, 10));
        });
    });

    block.querySelector('.slide-prev').addEventListener('click', () => {
        showSlide(block, parseInt(block.dataset.activeSlide, 10) - 1);
    });
    block.querySelector('.slide-next').addEventListener('click', () => {
        showSlide(block, parseInt(block.dataset.activeSlide, 10) + 1);
    });

    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) updateActiveSlide(entry.target);
        });
    }, { threshold: 0.5 });
    block.querySelectorAll('.hero-carousel-slide').forEach((slide) => {
        slideObserver.observe(slide);
    });
}

function createSlide(row, slideIndex, carouselId) {
    const slide = document.createElement('li');
    slide.dataset.slideIndex = slideIndex;
    slide.setAttribute('id', `hero-carousel-${carouselId}-slide-${slideIndex}`);
    slide.classList.add('hero-carousel-slide');

    row.querySelectorAll(':scope > div').forEach((column, colIdx) => {
        column.classList.add(`hero-carousel-slide-${colIdx === 0 ? 'image' : 'content'}`);
        slide.append(column);
    });

    const labeledBy = slide.querySelector('h1, h2, h3, h4, h5, h6');
    if (labeledBy) {
        slide.setAttribute('aria-labelledby', labeledBy.getAttribute('id'));
    }

    return slide;
}

let carouselId = 0;
export default async function decorate(block) {
    carouselId += 1;
    block.setAttribute('id', `hero-carousel-${carouselId}`);
    const rows = block.querySelectorAll(':scope > div');
    const isSingleSlide = rows.length < 2;

    const placeholders = await fetchPlaceholders();

    block.setAttribute('role', 'region');
    block.setAttribute('aria-roledescription', null || 'Carousel');

    const container = document.createElement('div');
    container.classList.add('hero-carousel-slides-container');

    const slidesWrapper = document.createElement('ul');
    slidesWrapper.classList.add('hero-carousel-slides');
    block.prepend(slidesWrapper);

    let slideIndicators;
    if (!isSingleSlide) {
        const slideIndicatorsNav = document.createElement('nav');
        slideIndicatorsNav.setAttribute('aria-label', null || 'Carousel Slide Controls');
        slideIndicators = document.createElement('ol');
        slideIndicators.classList.add('hero-carousel-slide-indicators');
        slideIndicatorsNav.append(slideIndicators);
        block.append(slideIndicatorsNav);

        const slideNavButtons = document.createElement('div');
        slideNavButtons.classList.add('hero-carousel-navigation-buttons');
        slideNavButtons.innerHTML = `
      <button type="button" class= "slide-prev" aria-label="${null || 'Previous Slide'}"></button>
      <button type="button" class="slide-next" aria-label="${null || 'Next Slide'}"></button>
    `;

        container.append(slideNavButtons);
    }

    rows.forEach((row, idx) => {
        const slide = createSlide(row, idx, carouselId);
        slidesWrapper.append(slide);

        if (slideIndicators) {
            const indicator = document.createElement('li');
            indicator.classList.add('hero-carousel-slide-indicator');
            indicator.dataset.targetSlide = idx;
            indicator.innerHTML = `<button type="button"><span>${null || 'Show Slide'} ${idx + 1} ${null || 'of'} ${rows.length}</span></button>`;
            slideIndicators.append(indicator);
        }
        row.remove();
    });

    container.append(slidesWrapper);
    block.prepend(container);

    if (!isSingleSlide) {
        bindEvents(block);
    }

    const herocar = document.querySelectorAll('.hero-carousel-container *');
    herocar.forEach((slide) => {
        slide.removeAttribute('id');
    });
    setTimeout(slidesRotator, 5000);
    const slideImage = document.querySelectorAll('.hero-carousel-slide-content img');
    slideImage.forEach((slide) => {
        slide.classList.add('animate');
    });
    const slideContents = document.querySelectorAll('.hero-carousel-slide-content *');
    slideContents.forEach((slide) => {
        slide.classList.add('animate');
    });
}

function slidesRotator() {
    const block = document.querySelector('.hero-carousel-container');
    const buttons = block.querySelectorAll('body > main > div.section.hero-carousel-container > div > div > nav > ol > li > button');
    let activeIndex;
    buttons.forEach((button, index) => {
        if (button.classList.contains('active-observer')) {
            activeIndex = index;
        }
    });
    showSlide(block, activeIndex + 1);
    setTimeout(slidesRotator, 5000);
}
