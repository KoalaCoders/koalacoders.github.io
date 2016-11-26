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
  const translate = new KoalaTranslate(window.translations, 'uk');

  document.querySelectorAll('[translate-lang]').forEach(el => {
    el.addEventListener('click', (e) => {
      translate.translate(e.target.attributes['translate-lang'].value);

      document.querySelectorAll('.lang__item.active').forEach(lang =>
        lang.classList.remove('active')
      );

      el.classList.add('active');
    });
  });
 });
