window.translations = {
  header: {
    about: {
      en: 'About',
      uk: 'Хто ми',
      ru: 'Кто мы'
    },
    team: {
      en: 'Team',
      uk: 'Команда',
      ru: 'Команда'
    },
    lections: {
      en: 'Lections',
      uk: 'Лекції',
      ru: 'Лекции'
    }
  },
  about: {
    title: {
      en: 'About',
      uk: 'Хто ми',
      ru: 'Кто мы'
    },
    history: {
      en: 'Our awesome story',
      uk: 'Чудова історія коали',
      ru: 'Наша мега офигенная история'
    }
  },
  team: {
    title: {
      en: 'Team',
      uk: 'Команда',
      ru: 'Команда'
    },
    vuchkan: {
      en: 'Volodimir Vuchkan',
      uk: 'Володимир Вучкан',
      ru: 'Вадимир Вучкан'
    },
    klinec: {
      en: 'Viktor Klinec',
      uk: 'Віктор Клинець',
      ru: 'Виктор Клинец'
    },
    motornyi: {
      en: 'Ihor Motornyi',
      uk: 'Ігор Моторний',
      ru: 'Игорь Моторный'
    },
    rudnytskykh: {
      en: 'Dmytro Rudnytskykh',
      uk: 'Дмитро Рудницьких',
      ru: 'Дмитрий Рудницких'
    },
    stetsenko: {
      en: 'Ivan Stetsenko',
      uk: 'Іван Стеценко',
      ru: 'Иван Стеценко'
    },

  }
};

class KoalaTranslate {

  constructor(translations = {}, currentLanguage = 'en') {
    this.translations = translations;
    this.currentLanguage = currentLanguage;
    this.elements = document.querySelectorAll('[translate]');
    this.translate();
  }

  translate(lang) {
    if (lang) this.currentLanguage = lang;

    this.elements.forEach((el) => {
      el.innerHTML = this.translateToken(this.translations, el.attributes.translate.value) || '';
    });
  }

  translateToken(source, tokenName) {
    if (!(source && tokenName)) return;

    const tokenArray = tokenName.split('.');
    const currentSource = source[tokenArray[0]];

    if (currentSource) {
      return (tokenArray.length <= 1)
        ? currentSource[this.currentLanguage]
        : this.translateToken(currentSource, tokenArray.slice(1).join('.'));
    } else return '';

  }
}

window.addEventListener('load', () => {
  let translate = new KoalaTranslate(window.translations);
  document.querySelectorAll('[translate-lang]').forEach(el => {
    el.addEventListener('click', (e) => {
      translate.translate(e.target.attributes['translate-lang'].value);
      document.querySelectorAll('.lang__item.active').forEach(lang =>
        lang.classList.remove('active')
      )
      el.classList.add('active');
    });
  });
 });
