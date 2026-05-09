document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('toggle-theme');
    
    // Check local storage for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggleBtn) themeToggleBtn.textContent = 'Toggle Light Mode';
    }

    if (themeToggleBtn) {
        // Toggle theme on button click
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            let newTheme = 'light';
            let btnText = 'Toggle Dark Mode';
            
            if (currentTheme !== 'dark') {
                newTheme = 'dark';
                btnText = 'Toggle Light Mode';
            }

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggleBtn.textContent = btnText;
        });
    }

    // Language Toggle Logic
    const video = document.getElementById('my-video');
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    
    if (video && langToggleBtn) {
        const langText = langToggleBtn.querySelector('.lang-text');
        let currentLang = 'ko';

        const wrapper = document.querySelector('.video-wrapper');
        let hideTimeout;
        
        function showControls() {
            if (!wrapper) return;
            wrapper.classList.add('show-controls');
            clearTimeout(hideTimeout);
            
            if (!video.paused) {
                hideTimeout = setTimeout(() => {
                    wrapper.classList.remove('show-controls');
                }, 2500);
            }
        }

        if (wrapper) {
            wrapper.classList.add('show-controls');
            wrapper.addEventListener('mousemove', showControls);
            wrapper.addEventListener('mouseenter', showControls);
            wrapper.addEventListener('mouseleave', () => {
                if (!video.paused) {
                    wrapper.classList.remove('show-controls');
                }
            });
            
            video.addEventListener('play', showControls);
            video.addEventListener('pause', () => {
                wrapper.classList.add('show-controls');
                clearTimeout(hideTimeout);
            });
        }

        langToggleBtn.addEventListener('click', () => {
            const isPaused = video.paused;
            const currentTime = video.currentTime;
            
            // 1. 자막 트랙 태그 가져오기
            const trackKo = video.querySelector('track[srclang="ko"]');
            const trackEn = video.querySelector('track[srclang="en"]');
            
            if (currentLang === 'ko') {
                currentLang = 'en';
                video.src = 'video_en.mp4';
                langText.textContent = 'EN';
                // 한국어 기본값 해제, 영어 기본값 설정
                if (trackKo) trackKo.removeAttribute('default');
                if (trackEn) trackEn.setAttribute('default', '');
            } else {
                currentLang = 'ko';
                video.src = 'video.mp4';
                langText.textContent = 'KR';
                // 영어 기본값 해제, 한국어 기본값 설정
                if (trackEn) trackEn.removeAttribute('default');
                if (trackKo) trackKo.setAttribute('default', '');
            }
            
            // 2. 비디오 다시 로드
            video.load();
            
            video.addEventListener('loadedmetadata', function onLoaded() {
                video.currentTime = currentTime;

                // 명시적으로 자막 트랙 활성화
                if (video.textTracks && video.textTracks.length > 0) {
                    for (let i = 0; i < video.textTracks.length; i++) {
                        const track = video.textTracks[i];
                        if (track.language === currentLang) {
                            track.mode = 'showing';
                        } else {
                            track.mode = 'hidden';
                        }
                    }
                }

                if (!isPaused) {
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(e => console.log(e));
                    }
                }
                video.removeEventListener('loadedmetadata', onLoaded);
            });
        });
    }
});
