// ^ Write your JavaScript code here

// scrollspy
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let currentSectionId = "";
    

    sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
    
        if (sectionTop <= 150) { 
            currentSectionId = section.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${currentSectionId}"]`);
            if(!navLink)
                return;
            document.querySelectorAll('a.active')?.forEach(a => a.classList.remove('active'));
            navLink.classList.add('active');
        }
        

    });

    // console.log("Currently viewing:", currentSectionId);

    
});

// Dark mode
let darkMode = localStorage.getItem('darkMode') === 'true' ? true : false;
if (darkMode) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

const toggleDarkMode = () => {
    darkMode = !darkMode;   
    if (darkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
};

document.getElementById('theme-toggle-button').addEventListener('click', toggleDarkMode);

// Navs and Tabs

const ACTIVE_CLASSES = [
    "bg-gradient-to-r", "from-primary", "to-secondary",
    "text-white",
    "hover:shadow-lg", "hover:shadow-primary/50"
];

const INACTIVE_CLASSES = [
    "bg-white", "dark:bg-slate-800",
    "text-slate-600", "dark:text-slate-300",
    "hover:bg-slate-100", "dark:hover:bg-slate-700",
    "border", "border-slate-300", "dark:border-slate-700"
];

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.portfolio-filter');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            

            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');

            filterButtons.forEach(b => {
                b.classList.remove(...ACTIVE_CLASSES);
                b.classList.add(...INACTIVE_CLASSES);
                b.setAttribute('aria-pressed', 'false');
            });

            this.classList.remove(...INACTIVE_CLASSES);
            this.classList.add(...ACTIVE_CLASSES);
            this.setAttribute('aria-pressed', 'true');
            

            const filterValue = this.getAttribute('data-filter');
            const items = document.querySelectorAll('.portfolio-item');

            items.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});


// testimonial 

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('testimonials-carousel');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const indicators = document.querySelectorAll('.carousel-indicator');

    const totalSlides = cards.length;
    let currentIndex = 0;

    let slidesVisible = 3;

    function updateSlidesVisible() {
        if (window.innerWidth >= 1024) {
        slidesVisible = 3;
        } else if (window.innerWidth >= 640) {
        slidesVisible = 2;
        } else {
        slidesVisible = 1;
        }
    }

    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = totalSlides/2;
        if (currentIndex > totalSlides/2) {currentIndex = 0;
            console.log("greater")
        }

        console.log(currentIndex)

        carousel.style.transform = `translateX(${currentIndex * (100 / slidesVisible)}%)`;

        indicators.forEach((dot, i) => {
            dot.classList.toggle('bg-accent', i === currentIndex);
            dot.classList.toggle('bg-slate-400', i !== currentIndex);
            dot.classList.toggle('dark:bg-slate-600', i !== currentIndex);
            dot.setAttribute('aria-selected', i === currentIndex);
        });
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    indicators.forEach((dot, index) => {
        dot.addEventListener('click', () => {
        goToSlide(index);
        });
    });



    window.addEventListener('resize', () => {
        updateSlidesVisible();
        goToSlide(currentIndex); // re-align
    });

    updateSlidesVisible();
    goToSlide(0);


});


// sidebar 

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('settings-toggle');
    btn.addEventListener('click', function() {
        const sidebar = document.getElementById('settings-sidebar');
        // const isOpen = sidebar.classList.contains('translate-x-0');

        // sidebar.classList.toggle('traslate-x-0', !isOpen);
        sidebar.classList.remove('translate-x-full');
        sidebar.setAttribute('aria-hidden', 'false');

        btn.style.cssText = 'right: calc(var(--spacing) * 80) !important; transition: right 0.3s ease;';

    })

    const closeBtn = document.getElementById('close-settings');
    closeBtn.addEventListener('click', function() {
        const sidebar = document.getElementById('settings-sidebar');
        // const isOpen = sidebar.classList.contains('translate-x-0');

        // sidebar.classList.toggle('traslate-x-0', !isOpen);
        sidebar.classList.add('translate-x-full');
        sidebar.setAttribute('aria-hidden', 'true');

        btn.style.cssText = 'right: 0 !important;'

    })


    let currentFontClass = localStorage.getItem('selectedFont') || 'font-tajawal';

    if(currentFontClass != 'font-tajawal')
        document.body.classList.replace('font-tajawal', currentFontClass);

    // console.log(currentFontClass)

    let currentSelectedOption = null;

    const fontOptions = document.querySelectorAll('.font-option');

    fontOptions.forEach(option => {
        if (option.getAttribute('data-font') === currentFontClass.replace('font-', '')) {
            currentSelectedOption = option;
            option.setAttribute('aria-checked', 'true');
            if (option.children[2]) {
                option.children[2].setAttribute('aria-hidden', 'false');
                option.children[2].classList.remove('opacity-0');
            }
            option.style.borderColor = 'color-mix(in oklab, var(--color-primary) 50%, transparent)';
        }
    });

    fontOptions.forEach(option => {
        option.addEventListener('click', function () {
            const newFontName = this.getAttribute('data-font');
            const newFontClass = `font-${newFontName}`;

            if (newFontClass === currentFontClass) return;

            document.body.classList.remove(currentFontClass);
            document.body.classList.add(newFontClass);

            localStorage.setItem('selectedFont', newFontClass);
            currentFontClass = newFontClass;

            if (currentSelectedOption && currentSelectedOption !== this) {
                currentSelectedOption.setAttribute('aria-checked', 'false');
                if (currentSelectedOption.children[2]) {
                    currentSelectedOption.children[2].setAttribute('aria-hidden', 'true');
                    currentSelectedOption.children[2].classList.add('opacity-0');
                }
                currentSelectedOption.style.removeProperty('border-color');
            }

            this.setAttribute('aria-checked', 'true');
            if (this.children[2]) {
                this.children[2].setAttribute('aria-hidden', 'false');
                this.children[2].classList.remove('opacity-0');
            }
            this.style.borderColor = 'color-mix(in oklab, var(--color-primary) 50%, transparent)';

            currentSelectedOption = this;
        });
    });


    // color theme

    const colorGrid = document.querySelector('#theme-colors-grid');
    

    const savedTheme = localStorage.getItem('selectedTheme') ;

    
    colorGrid.innerHTML +=`
    <button class="color-option w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm" title="Purple Blue" data-primary="#6366f1" data-secondary="#8b5cf6" style="background: linear-gradient(135deg, rgb(99, 102, 241), rgb(139, 92, 246));"></button>
    <button class="color-option w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm" title="Pink Orange" data-primary="#ec4899" data-secondary="#f97316" style="background: linear-gradient(135deg, rgb(236, 72, 153), rgb(249, 115, 22));"></button>
    <button class="color-option w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm" title="Green Emerald" data-primary="#10b981" data-secondary="#059669" style="background: linear-gradient(135deg, rgb(16, 185, 129), rgb(5, 150, 105));"></button>
    <button class="color-option w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm" title="Blue Cyan" data-primary="#3b82f6" data-secondary="#06b6d4" style="background: linear-gradient(135deg, rgb(59, 130, 246), rgb(6, 182, 212));"></button>
    <button class="color-option w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm" title="Red Rose" data-primary="#ef4444" data-secondary="#f43f5e" style="background: linear-gradient(135deg, rgb(239, 68, 68), rgb(244, 63, 94));"></button>
    <button class="color-option w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm" title="Amber Orange" data-primary="#f59e0b" data-secondary="#ea580c" style="background: linear-gradient(135deg, rgb(245, 158, 11), rgb(234, 88, 12));"></button>`
    
    const colorOptions = document.querySelectorAll('.color-option');

    const selectedColor = savedTheme ? savedTheme.split('-') : ['#6366f1', '#8b5cf6'];

    document.documentElement.style.setProperty('--color-primary', selectedColor[0]);
    document.documentElement.style.setProperty('--color-secondary', selectedColor[1]);

    let activeOption = document.querySelector(`.color-option[data-primary="${selectedColor[0]}"][data-secondary="${selectedColor[1]}"]`);

    activeOption?.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-white', 'dark:ring-offset-slate-900');

    colorOptions.forEach(option => {
        option.addEventListener('click', function(){
            const primaryColor = option.getAttribute('data-primary');
            const secondaryColor = option.getAttribute('data-secondary');

            localStorage.setItem('selectedTheme', `${primaryColor}-${secondaryColor}`);

            document.documentElement.style.setProperty('--color-primary', primaryColor);
            document.documentElement.style.setProperty('--color-secondary', secondaryColor);

            selectedColor[0] = primaryColor;
            selectedColor[1] = secondaryColor;

            activeOption?.classList.remove('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-white', 'dark:ring-offset-slate-900');
            activeOption = option;
            activeOption.classList.add('ring-2', 'ring-primary', 'ring-offset-2', 'ring-offset-white', 'dark:ring-offset-slate-900');


        })
    })

    localStorage.setItem('selectedTheme', savedTheme || `${selectedColor[0]}-${selectedColor[1]}`);
});


// scroll to top 

const scrollToTopBtn = document.getElementById('scroll-to-top');
console.log(scrollToTopBtn)

window.addEventListener('scroll', () => {

    const heroSection = document.getElementById('hero-section');
    // console.log(heroSection)
    const heroTop = heroSection.getBoundingClientRect().top;


    if (heroTop < -300) {
        scrollToTopBtn.classList.toggle('invisible', false);
        scrollToTopBtn.children[0].setAttribute('aria-hidden', 'false')
        scrollToTopBtn.classList.remove('opacity-0');
        console.log(scrollToTopBtn)
    }else {
        scrollToTopBtn.classList.toggle('invisible', true)
        scrollToTopBtn.children[0].setAttribute('aria-hidden', 'true')
        scrollToTopBtn.classList.add('opacity-0');
    }

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })
})
