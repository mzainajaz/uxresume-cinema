
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				netflix: {
					red: '#E50914',
					black: '#141414',
					dark: '#181818',
					light: '#F5F5F1',
					gray: '#808080',
					'card-dark': '#232323',
					'card-hover': '#2A2A2A'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'card-hover': {
					'0%': { transform: 'scale(1)' },
					'100%': { transform: 'scale(1.05)' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(0)' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				// Netflix preloader animations
				'netflix-n': {
					'0%': { transform: 'skew-x(12deg) scale(0)', opacity: '0' },
					'30%': { transform: 'skew-x(12deg) scale(1)', opacity: '1' },
					'70%': { transform: 'skew-x(12deg) scale(1)', opacity: '1' },
					'100%': { transform: 'skew-x(12deg) scale(1.5)', opacity: '0' }
				},
				'netflix-left': {
					'0%': { transform: 'scale(0)', opacity: '0' },
					'30%': { transform: 'scale(1)', opacity: '1' },
					'70%': { transform: 'scale(1)', opacity: '1' },
					'100%': { transform: 'scale(1.5)', opacity: '0' }
				},
				'netflix-right': {
					'0%': { transform: 'scale(0)', opacity: '0' },
					'30%': { transform: 'scale(1)', opacity: '1' },
					'70%': { transform: 'scale(1)', opacity: '1' },
					'100%': { transform: 'scale(1.5)', opacity: '0' }
				},
				'netflix-text': {
					'0%': { opacity: '0', transform: 'scale(0.8)' },
					'60%': { opacity: '0', transform: 'scale(0.8)' },
					'80%': { opacity: '1', transform: 'scale(1)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'netflix-sound': {
					'0%': { transform: 'scaleX(0)' },
					'100%': { transform: 'scaleX(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'card-hover': 'card-hover 0.3s ease-out forwards',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-up': 'slide-up 0.7s ease-out',
				'slide-down': 'slide-down 0.7s ease-out',
				'slide-in-right': 'slide-in-right 0.5s ease-out',
				'pulse-soft': 'pulse-soft 2s infinite ease-in-out'
			},
			fontFamily: {
				'netflix-sans': ['"Netflix Sans"', 'Helvetica', 'Arial', 'sans-serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
