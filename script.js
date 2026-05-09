const skillsData = [
    { name: "HTML", percent: 80 },
    { name: "CSS", percent: 75 },
    { name: "JavaScript", percent: 55 },
    { name: "React", percent: 50 },
    { name: "jQuery", percent: 60 },
    { name: "C / Structures de données", percent: 90 }
];
const softSkills = ["Français", "Anglais", "Travail en équipe", "Persévérance", "Résolution de problèmes"];
const timelineData = [
    { year: "2022", desc: "Obtention du baccalauréat." },
    { year: "2023", desc: "Admission à l'ENSA Agadir." },
    { year: "2024", desc: "Validation de la première année avec une moyenne de 12/20." },
    { year: "2025", desc: "Poursuite du parcours à l'ENSA Agadir." },
    { year: "2026", desc: "Transfert réussi vers la FSSM de Marrakech en SINF2." }
];
const projectsData = [
    {
        title: "Moteur de jeu 2D en C",
        desc: "Développement d'un petit moteur de jeu avec gestion des collisions et sprites.",
        tech: ["C", "SDL2", "Structures de données"],
        link: "https://github.com/abdelhakmouad3-lab/game-engine-c"
    },
    {
        title: "Portfolio interactif",
        desc: "Site web personnel avec animations jQuery et composants React.",
        tech: ["HTML5", "CSS3", "JavaScript", "React", "jQuery"],
        link: "https://github.com/abdelhakmouad3-lab/portfolio"
    }
];
const ProjectCard = ({ title, description, technologies, link }) => {
    return React.createElement('div', { className: 'project-card' },
        React.createElement('h3', null, title),
        React.createElement('p', null, description),
        React.createElement('div', { className: 'project-tech' },
            technologies.map((tech, idx) => 
                React.createElement('span', { key: idx, className: 'tech-badge' }, tech)
            )
        ),
        React.createElement('a', { href: link, className: 'project-link', target: '_blank', rel: 'noopener noreferrer' }, 
            'Voir sur GitHub ', React.createElement('i', { className: 'fab fa-github' })
        )
    );
};
const ContactForm = () => {
    const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = React.useState({});
    const [success, setSuccess] = React.useState(false);
    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Nom requis';
        if (!formData.email.trim()) newErrors.email = 'Email requis';
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email invalide';
        if (!formData.message.trim()) newErrors.message = 'Message requis';
        return newErrors;
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length === 0) {
            setSuccess(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setSuccess(false), 3000);
        } else {
            setErrors(newErrors);
        }
    };
    return React.createElement('form', { onSubmit: handleSubmit },
        React.createElement('div', { className: 'form-group' },
            React.createElement('input', { type: 'text', name: 'name', placeholder: 'Votre nom', value: formData.name, onChange: handleChange }),
            errors.name && React.createElement('div', { className: 'error-msg', style: { display: 'block' } }, errors.name)
        ),
        React.createElement('div', { className: 'form-group' },
            React.createElement('input', { type: 'email', name: 'email', placeholder: 'Votre email', value: formData.email, onChange: handleChange }),
            errors.email && React.createElement('div', { className: 'error-msg', style: { display: 'block' } }, errors.email)
        ),
        React.createElement('div', { className: 'form-group' },
            React.createElement('textarea', { name: 'message', placeholder: 'Votre message', value: formData.message, onChange: handleChange }),
            errors.message && React.createElement('div', { className: 'error-msg', style: { display: 'block' } }, errors.message)
        ),
        React.createElement('button', { type: 'submit' }, 'Envoyer'),
        success && React.createElement('div', { className: 'success-msg', style: { display: 'block' } }, 'Message envoyé avec succès !')
    );
};
const App = () => {
    React.useEffect(() => {
        const skillsSection = $('#skills');
        let animated = false;
        const animateSkills = () => {
            if (!animated) {
                $('.skill-bar').each(function() {
                    const width = $(this).data('width');
                    $(this).css('width', width + '%');
                });
                animated = true;
            }
        };
        $(window).on('scroll', function() {
            const sectionTop = skillsSection.offset().top;
            const scrollPos = $(window).scrollTop() + $(window).height() - 100;
            if (scrollPos > sectionTop && !animated) {
                animateSkills();
            }
        });
        $('.skill-bar').each(function() {
            const percent = $(this).data('width');
            $(this).css('width', '0%');
            setTimeout(() => {
                if ($(window).scrollTop() + $(window).height() > skillsSection.offset().top) {
                    animateSkills();
                }
            }, 200);
        });
        $('.timeline-item').on('click', function() {
            $(this).toggleClass('active');
        });
        $('.skill-item').hover(
            function() {
                const bar = $(this).find('.skill-bar');
                const width = bar.data('width');
                bar.css('width', width + '%');
            },
            function() {
                if (!animated) {
                    $(this).find('.skill-bar').css('width', '0%');
                } else {
                    const width = $(this).find('.skill-bar').data('width');
                    $(this).find('.skill-bar').css('width', width + '%');
                }
            }
        );
        $('a[href^="#"]').on('click', function(e) {
            e.preventDefault();
            const target = $(this.hash);
            if (target.length) {
                $('html, body').animate({ scrollTop: target.offset().top - 30 }, 500);
            }
        });
    }, []);
    return React.createElement('div', { className: 'container' },
        React.createElement('header', null,
            React.createElement('div', { className: 'header-content' },
                React.createElement('img', { src: 'Mypic.jpg', alt: 'Mouad Abdelhak', className: 'profile-img', onError: (e) => { e.target.src = 'https://via.placeholder.com/150?text=Photo'; } }),
                React.createElement('div', { className: 'header-info' },
                    React.createElement('h1', null, 'Mouad Abdelhak'),
                    React.createElement('div', { className: 'title' }, 'Étudiant en SINF2 à la FSSM | futur développeur de jeux vidéo'),
                    React.createElement('div', { className: 'contact-info' },
                        React.createElement('a', { href: 'mailto:morkadosse123@gmail.com' }, React.createElement('i', { className: 'fas fa-envelope' }), 'morkadosse123@gmail.com'),
                        React.createElement('a', { href: 'https://github.com/abdelhakmouad3-lab', target: '_blank' }, React.createElement('i', { className: 'fab fa-github' }), 'abdelhakmouad3-lab'),
                        React.createElement('a', { href: 'https://linkedin.com/in/mouad-abdelhak', target: '_blank' }, React.createElement('i', { className: 'fab fa-linkedin' }), 'Mouad Abdelhak')
                    )
                )
            )
        ),
        React.createElement('section', { id: 'about' },
            React.createElement('h2', null, 'À propos'),
            React.createElement('div', { className: 'about-text' },
                'Je suis étudiant en deuxième année SINF2 à la faculté des sciences Semlalia de Marrakech. Je suis passionné par l\'informatique et surtout par le développement de jeux vidéo. Mon parcours universitaire n\'a pas été simple, mais il m\'a appris à être patient et persévérant. J\'ai de bonnes bases en langage C et en structures de données, ainsi que des connaissances correctes en HTML, CSS et JavaScript. Mon objectif est de devenir développeur de jeux vidéo dans un grand studio comme Rockstar Games ou Ubisoft. En dehors des études, j\'aime les jeux vidéo, le football, la natation et le surf.'
            )
        ),
        React.createElement('section', { id: 'skills' },
            React.createElement('h2', null, 'Compétences'),
            React.createElement('div', { className: 'skills-grid' },
                React.createElement('div', null,
                    skillsData.map((skill, idx) => 
                        React.createElement('div', { key: idx, className: 'skill-item' },
                            React.createElement('div', { className: 'skill-name' }, React.createElement('span', null, skill.name), React.createElement('span', null, skill.percent + '%')),
                            React.createElement('div', { className: 'skill-bar-bg' },
                                React.createElement('div', { className: 'skill-bar', 'data-width': skill.percent })
                            )
                        )
                    )
                ),
                React.createElement('div', null,
                    React.createElement('div', { className: 'soft-skills' },
                        softSkills.map((skill, idx) => 
                            React.createElement('span', { key: idx, className: 'soft-tag' }, skill)
                        )
                    )
                )
            )
        ),
        React.createElement('section', { id: 'education' },
            React.createElement('h2', null, 'Formation'),
            React.createElement('div', { className: 'timeline' },
                timelineData.map((item, idx) => 
                    React.createElement('div', { key: idx, className: 'timeline-item' },
                        React.createElement('div', { className: 'timeline-year' }, item.year),
                        React.createElement('div', { className: 'timeline-content' }, item.desc)
                    )
                )
            )
        ),
        React.createElement('section', { id: 'projects' },
            React.createElement('h2', null, 'Expériences & Projets'),
            React.createElement('div', { className: 'projects-grid' },
                projectsData.map((project, idx) => 
                    React.createElement(ProjectCard, {
                        key: idx,
                        title: project.title,
                        description: project.desc,
                        technologies: project.tech,
                        link: project.link
                    })
                )
            )
        ),
        React.createElement('section', { id: 'contact' },
            React.createElement('h2', null, 'Contact'),
            React.createElement(ContactForm, null)
        ),
        React.createElement('footer', null,
            React.createElement('p', null, '© 2026 Mouad Abdelhak - CV Interactif')
        )
    );
};
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
