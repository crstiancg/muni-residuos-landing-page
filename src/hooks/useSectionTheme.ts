import { SECTION_THEMES, type SectionThemeKey, getThemeStyles } from '../config/sectionThemes';

export function useSectionTheme(key: SectionThemeKey) {
  return {
    theme: SECTION_THEMES[key],
    styles: getThemeStyles(key),
  };
}
