const plugin = require('tailwindcss/plugin');
const _ = require("lodash");
const tailpress = require('./tailpress.json');
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    tailpress,
    purge: {
        content: [
            './*.php',
            './*/*.php',
        ],
        options: {
            safelist: {
                standard: [/^has-/, /^align/, /^wp-/]
            }
        }
    },
    theme: {
        container: {
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '0rem'
            },
        },
        extend: {
            // override the default theme using the key directly
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                black: colors.black,
                white: colors.white,
                gray: colors.coolGray,
                indigo: colors.indigo,
                red: colors.red,
                yellow: colors.amber,
                green: colors.emerald,
                blue: colors.blue,
                purple: colors.violet,
                'primary': {
                    50: '#F6F7FF',
                    100: '#EDF0FE',
                    200: '#D2D9FD',
                    300: '#B6C1FB',
                    400: '#8093F9',
                    500: '#4965F6',
                    600: '#425BDD',
                    700: '#2C3D94',
                    800: '#212D6F',
                    900: '#161E4A',
                  },
                  'secondary': {
                    50: '#F5FDF9',
                    100: '#ECFAF4',
                    200: '#CFF3E3',
                    300: '#B2ECD2',
                    400: '#78DDB0',
                    500: '#3ECF8E',
                    600: '#38BA80',
                    700: '#257C55',
                    800: '#1C5D40',
                    900: '#133E2B',
                  },
                  'tertiary': {
                    50: '#F7F7F8',
                    100: '#EEEEF1',
                    200: '#D5D5DB',
                    300: '#BCBCC5',
                    400: '#898A9A',
                    500: '#57586E',
                    600: '#4E4F63',
                    700: '#343542',
                    800: '#272832',
                    900: '#1A1A21',
                  },
                  'danger': {
                    50: '#FEF8F8',
                    100: '#FEF2F2',
                    200: '#FCDEDE',
                    300: '#FACACA',
                    400: '#F7A3A3',
                    500: '#F37B7B',
                    600: '#DB6F6F',
                    700: '#924A4A',
                    800: '#6D3737',
                    900: '#492525',
                  },
                  "code-400": "#fefcf9",
                  "code-600": "#3c455b"
            }
        },
    },
    plugins: [
        plugin(function ({addUtilities, addComponents, e, prefix, config, theme}) {
            const colors = theme('colors');
            const margin = theme('margin');
            const screens = theme('screens');
            const fontSize = theme('fontSize');

            const editorColorText = _.map(config("tailpress.colors", {}), (value, key) => {
                return {
                    [`.has-${key}-text-color`]: {
                        color: value,
                    },
                };
            });

            const editorColorBackground = _.map(config("tailpress.colors", {}), (value, key) => {
                return {
                    [`.has-${key}-background-color`]: {
                        backgroundColor: value,
                    },
                };
            });

            const editorFontSizes = _.map(config("tailpress.fontSizes", {}), (value, key) => {
                return {
                    [`.has-${key}-font-size`]: {
                        fontSize: value[0],
                        fontWeight: `${value[1] || 'normal'}`
                    },
                };
            });

            const alignmentUtilities = {
                '.alignfull': {
                    margin: `${margin[2] || '0.5rem'} calc(50% - 50vw)`,
                    maxWidth: '100vw',
                    "@apply w-screen": {}
                },
                '.alignwide': {
                    "@apply -mx-16 my-2 max-w-screen-xl": {}
                },
                '.alignnone': {
                    "@apply h-auto max-w-full mx-0": {}
                },
                ".aligncenter": {
                    margin: `${margin[2] || '0.5rem'} auto`,
                    "@apply block": {}
                },
                [`@media (min-width: ${screens.sm || '640px'})`]: {
                    '.alignleft:not(.wp-block-button)': {
                        marginRight: margin[2] || '0.5rem',
                        "@apply float-left": {}
                    },
                    '.alignright:not(.wp-block-button)': {
                        marginLeft: margin[2] || '0.5rem',
                        "@apply float-right": {}
                    },
                    ".wp-block-button.alignleft a": {
                        "@apply float-left mr-4": {},
                    },
                    ".wp-block-button.alignright a": {
                        "@apply float-right ml-4": {},
                    },
                },
            };

            const imageCaptions = {
                '.wp-caption': {
                    "@apply inline-block": {},
                    '& img': {
                        marginBottom: margin[2] || '0.5rem',
                        "@apply leading-none": {}
                    },
                },
                '.wp-caption-text': {
                    fontSize: (fontSize.sm && fontSize.sm[0]) || '0.9rem',
                    color: (colors.gray && colors.gray[600]) || '#718096',
                },
            };

            addUtilities([editorColorText, editorColorBackground, alignmentUtilities, editorFontSizes, imageCaptions], {
                respectPrefix: false,
                respectImportant: false,
            });
        }),
    ]
};
