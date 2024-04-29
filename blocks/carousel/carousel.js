import { fetchPlaceholders } from '../../scripts/aem.js';

function updateActiveSlide(slide) {
    const block = slide.closest('.carousel');
    const slideIndex = parseInt(slide.dataset.slideIndex, 10);
    block.dataset.activeSlide = slideIndex;

    const slides = block.querySelectorAll('.carousel-slide');

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

    const indicators = block.querySelectorAll('.carousel-slide-indicator');
    indicators.forEach((indicator, idx) => {
        if (idx !== slideIndex) {
            indicator.querySelector('button').removeAttribute('disabled');
        } else {
            indicator.querySelector('button').setAttribute('disabled', 'true');
        }
    });
}

function showSlide(block, slideIndex = 0) {
    const slides = block.querySelectorAll('.carousel-slide');
    let realSlideIndex = slideIndex < 0 ? slides.length - 1 : slideIndex;
    if (slideIndex >= slides.length) realSlideIndex = 0;
    const activeSlide = slides[realSlideIndex];

    activeSlide.querySelectorAll('a').forEach((link) => link.removeAttribute('tabindex'));
    block.querySelector('.carousel-slides').scrollTo({
        top: 0,
        left: activeSlide.offsetLeft,
        behavior: 'smooth',
    });
}

function bindEvents(block) {
    const slideIndicators = block.querySelector('.carousel-slide-indicators');
    if (!slideIndicators) return;

    slideIndicators.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', (e) => {
            const slideIndicator = e.currentTarget.parentElement;
            showSlide(block, parseInt(slideIndicator.dataset.targetSlide, 10));
        });
    });

    // block.querySelector('.slide-prev').addEventListener('click', () => {
    //     showSlide(block, parseInt(block.dataset.activeSlide, 10) - 1);
    // });
    // block.querySelector('.slide-next').addEventListener('click', () => {
    //     showSlide(block, parseInt(block.dataset.activeSlide, 10) + 1);
    // });

    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) updateActiveSlide(entry.target);
        });
    }, { threshold: 0.5 });
    block.querySelectorAll('.carousel-slide').forEach((slide) => {
        slideObserver.observe(slide);
    });
}

function createSlide(row, slideIndex, carouselId) {
    const slide = document.createElement('li');
    slide.dataset.slideIndex = slideIndex;
    slide.setAttribute('id', `carousel-${carouselId}-slide-${slideIndex}`);
    slide.classList.add('carousel-slide');

    row.querySelectorAll(':scope > div').forEach((column, colIdx) => {
        column.classList.add(`carousel-slide-${colIdx === 0 ? 'image' : 'content'}`);
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
    block.setAttribute('id', `carousel-${carouselId}`);
    const rows = block.querySelectorAll(':scope > div');
    const isSingleSlide = rows.length < 2;

    const placeholders = await fetchPlaceholders();

    block.setAttribute('role', 'region');
    block.setAttribute('aria-roledescription', placeholders.carousel || 'Carousel');

    const container = document.createElement('div');
    container.classList.add('carousel-slides-container');

    const slidesWrapper = document.createElement('ul');
    slidesWrapper.classList.add('carousel-slides');
    block.prepend(slidesWrapper);

    let slideIndicators;
    if (!isSingleSlide) {
        const slideIndicatorsNav = document.createElement('nav');
        slideIndicatorsNav.setAttribute('aria-label', placeholders.carouselSlideControls || 'Carousel Slide Controls');
        slideIndicators = document.createElement('ol');
        slideIndicators.classList.add('carousel-slide-indicators');
        slideIndicatorsNav.append(slideIndicators);
        block.append(slideIndicatorsNav);

        const slideNavButtons = document.createElement('div');
        slideNavButtons.classList.add('carousel-navigation-buttons');
        slideNavButtons.innerHTML = `
      <button type="button" class= "slide-prev" aria-label="${placeholders.previousSlide || 'Previous Slide'}"></button>
      <button type="button" class="slide-next" aria-label="${placeholders.nextSlide || 'Next Slide'}"></button>
    `;

        container.append(slideNavButtons);
    }

    rows.forEach((row, idx) => {
        const slide = createSlide(row, idx, carouselId);
        slidesWrapper.append(slide);

        if (slideIndicators) {
            const indicator = document.createElement('li');
            indicator.classList.add('carousel-slide-indicator');
            indicator.dataset.targetSlide = idx;
            indicator.innerHTML = `<button type="button"><span>${placeholders.showSlide || 'Show Slide'} ${idx + 1} ${placeholders.of || 'of'} ${rows.length}</span></button>`;
            slideIndicators.append(indicator);
        }
        row.remove();
    });

    container.append(slidesWrapper);
    block.prepend(container);

    if (!isSingleSlide) {
        bindEvents(block);
    }
    customHandling();
    handleEvents();
}

function customHandling() {

    const carouselSlideImages = document.querySelectorAll('.vehicle-values .carousel-slide-image picture');
    const carouselSlideContent = document.querySelectorAll('.vehicle-values .carousel-slide-content');
    const carouselContainer = document.querySelector('.vehicle-values .carousel-slides-container');
    const navButtons = document.querySelector('.vehicle-values .carousel-navigation-buttons');
    carouselContainer.innerHTML = '';

    const imagesUl = document.createElement('ul');
    imagesUl.classList.add('carousel-slide-images');
    carouselSlideImages.forEach((image, index) => {
        const li = document.createElement('li');
        li.classList.add('carousel-slide-image-wrapper');
        if (index === 0) {
            li.classList.add('active-image');
        }
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('carousel-slide-image');
        imageDiv.appendChild(image);
        li.appendChild(imageDiv);
        imagesUl.appendChild(li);
    });

    const imageSectionDiv = document.createElement('div');
    imageSectionDiv.classList.add('carousel-slide-image-section');
    imageSectionDiv.appendChild(imagesUl);
    imageSectionDiv.appendChild(navButtons);

    const contentSectionDiv = document.createElement('div');
    contentSectionDiv.classList.add('carousel-slide-content-section');
    const reasonsDiv = document.createElement('div');
    reasonsDiv.classList.add('carousel-slide-content-reasons');
    reasonsDiv.innerText = 'Reasons to love';
    const contentUl = document.createElement('div');
    contentUl.classList.add('carousel-slide-content-wrapper');
    carouselSlideContent.forEach((content, index) => {
        content.classList.add('carousel-slide-content');
        if (index === 0) {
            content.classList.add('active-content');
        }
        contentUl.appendChild(content);
    });
    contentSectionDiv.appendChild(reasonsDiv);
    contentSectionDiv.appendChild(contentUl);


    const counterDiv = document.createElement('div');
    counterDiv.classList.add('carousel-slide-content-counter');
    const counterWrapper = document.createElement('div');
    const counterUl = document.createElement('ul');
    [1, 2, 3].forEach((index) => {
        const li = document.createElement('li');
        li.classList.add('carousel-slide-counter');
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');
        span1.innerText = '0';
        span2.innerText = index.toString();
        li.appendChild(span1);
        li.appendChild(span2);
        if (index === 1) {
            li.classList.add('active-counter');
        }
        counterUl.appendChild(li);
    });
    const staticText = document.createElement('p');
    staticText.classList.add('carousel-slide-counter-static');
    staticText.innerText = '/03';
    counterWrapper.appendChild(counterUl);
    counterWrapper.appendChild(staticText);
    counterDiv.appendChild(counterWrapper);

    contentSectionDiv.appendChild(counterDiv);

    carouselContainer.appendChild(contentSectionDiv);
    carouselContainer.appendChild(imageSectionDiv);
}

function handleEvents() {

    const contents = document.querySelectorAll('#carousel-1 > div > div.carousel-slide-content-section > div.carousel-slide-content-wrapper > div.carousel-slide-content > *');
    contents.forEach((content) => {
       content.classList.add('animated-element');
    });

    const navButtons = document.querySelectorAll('.carousel-navigation-buttons button');
    navButtons[1].addEventListener('click', () => {
        const images = document.querySelectorAll('.carousel-slide-images li');
        [...images].some((image, index) => {
            if (image.classList.contains('active-image')) {
                image.classList.remove('active-image');
                images[(index+1) > 2 ? 0 : index+1].classList.add('active-image');
                return true;
            }
        });
        const contents = document.querySelectorAll('.carousel-slide-content-wrapper > div');
        [...contents].some((content, index) => {
            if (content.classList.contains('active-content')) {
                content.classList.remove('active-content');
                const x = (index+1) > 2 ? 0 : index+1;
                contents.forEach((c) => {
                    c.style.transform = `translateX(${x * content.parentElement.clientWidth * -1}px)`;
                });
                contents[(index+1) > 2 ? 0 : index+1].classList.add('active-content');
                return true;
            }
        });
        const counters = document.querySelectorAll('.carousel-slide-content-counter ul li');
        [...counters].some((counter, index) => {
            if (counter.classList.contains('active-counter')) {
                counter.classList.remove('active-counter');
                const x = (index+1) > 2 ? 0 : index+1;
                counters[x].classList.add('active-counter');
                counters.forEach((c) => {
                    c.style.transform = `translateY(${x * counter.clientHeight * -1}px)`;
                });
                return true;
            }
        });
    });

    navButtons[0].addEventListener('click', () => {
        const images = document.querySelectorAll('.carousel-slide-images li');
        [...images].some((image, index) => {
            if (image.classList.contains('active-image')) {
                image.classList.remove('active-image');
                images[(index-1) < 0 ? 2 : index-1].classList.add('active-image');
                return true;
            }
        });
        const contents = document.querySelectorAll('.carousel-slide-content-wrapper > div');
        [...contents].some((content, index) => {
            if (content.classList.contains('active-content')) {
                content.classList.remove('active-content');
                const x = (index-1) < 0 ? 2 : index-1;
                contents.forEach((c) => {
                    c.style.transform = `translateX(${x * content.parentElement.clientWidth * -1}px)`;
                });
                contents[(index-1) < 0 ? 2 : index-1].classList.add('active-content');
                return true;
            }
        });
        const counters = document.querySelectorAll('.carousel-slide-content-counter ul li');
        [...counters].some((counter, index) => {
            if (counter.classList.contains('active-counter')) {
                const x = (index-1) < 0 ? 2 : index-1;
                counters[x].classList.add('active-counter');
                counter.classList.remove('active-counter');
                counters.forEach((c) => {
                    c.style.transform = `translateY(${x * counter.clientHeight * -1}px)`;
                });
                return true;
            }
        });
    });
}
