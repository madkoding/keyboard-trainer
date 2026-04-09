# Keyboard Trainer

Practica y optimiza tu layout de teclado Corne con este trainer interactivo.

## Stack

- **Vite** + **React** + **TypeScript**
- **Vitest** para tests unitarios
- **Vercel** para deploy

## Quick Start

```bash
cd keyboard-trainer
npm install
npm run dev
```

## Scripts

| Script | Descripcion |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de produccion |
| `npm run test` | Ejecutar tests (vitest) |
| `npm run test -- --run` | Tests una vez |
| `npm run lint` | Linting |

## Estructura del Proyecto

```
src/
├── components/       # Componentes UI
│   ├── Key.tsx       # Tecla individual
│   ├── Hand.tsx      # Mano (5 teclas + hints)
│   ├── Stats.tsx     # PPM, Precision, Racha
│   ├── WordDisplay.tsx
│   └── PracticeArea.tsx
├── utils/            # Logica de negocio
│   ├── layout.ts    # Layouts Corne
│   └── words.ts     # Palabras practice
├── types/           # Tipos TypeScript
└── App.tsx          # Componente principal
```

## Componentes

### Key
```tsx
<Key label="Q" finger={0} isPressed={false} isError={false} onClick={() => {}} />
```
- `label`: Texto a mostrar en la tecla
- `finger`: 0=meñique, 1=anular, 2=medio, 3=índice, 4=pulgar
- `isPressed`: Animacion de pressed
- `isError`: Highlight rojo

### Hand
```tsx
<Hand keys={layout.left} fingerMap={fingerMap.left} isRight={false} />
```
- Renderiza una mano completa (3 filas x 5 columnas)
- `isRight`: Invierte el orden de dedos para mano derecha

### Stats
```tsx
<Stats wpm={45} accuracy={98} streak={12} />
```

## Utils

### layout.ts
- `LEFT_LAYOUT` / `RIGHT_LAYOUT`: Layouts qwerty del Corne
- `LEFT_FINGER_MAP` / `RIGHT_FINGER_MAP`: Mapa de dedos
- `createHandLayout()`: Crea estructura con labels
- `createFingerMap()`: Crea mapa de dedos

### words.ts
- `PRACTICE_WORDS`: Array de palabras en español
- `getRandomWord()`: Palabra aleatoria
- `charToKeyCode(char)`: Mapea char → KC_*

## Tests

```bash
npm run test -- --run
```

Archivos de test cerca de su modulo:
- `src/utils/layout.test.ts`
- `src/utils/words.test.ts`
- `src/components/Key.test.tsx`

## Deploy

### Vercel (recomendado)
```bash
npm install -g vercel
vercel
```

### Manual
```bash
npm run build
# Output en dist/
```

## Desarrollo

### Agregar nueva tecla al layout
Editar `src/utils/layout.ts`:
```typescript
export const LEFT_LAYOUT = [
  ['KC_Q', 'KC_W', 'KC_E', 'KC_R', 'KC_T'], // row 0
  ['KC_A', 'KC_S', 'KC_D', 'KC_F', 'KC_G'], // row 1
  ['KC_Z', 'KC_X', 'KC_C', 'KC_V', 'KC_B'], // row 2
];
```

### Agregar palabras practice
Editar `src/utils/words.ts`:
```typescript
export const PRACTICE_WORDS = [
  // ... existing words
  'nueva palabra',
];
```

### Agregar componente
1. Crear en `src/components/`
2. Exportar en `src/components/index.ts`
3. Importar en `App.tsx`

## Color de dedos

| Finger | Color | Nombre |
|--------|-------|--------|
| 0 | #ff6b6b | Meñique |
| 1 | #ffa500 | Anular |
| 2 | #00d9ff | Medio |
| 3 | #4ade80 | Índice |
| 4 | #9b59b6 | Pulgar |
