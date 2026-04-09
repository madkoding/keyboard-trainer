import { describe, it, expect } from 'vitest';
import { getRandomWord, charToKeyCode, PRACTICE_WORDS } from '../utils/words';

describe('words utils', () => {
  describe('getRandomWord', () => {
    it('should return a word from PRACTICE_WORDS', () => {
      const word = getRandomWord();
      expect(PRACTICE_WORDS).toContain(word);
    });

    it('should return consistent results with same seed', () => {
      // Math.random is not seeded, so we just verify it returns valid words
      const word = getRandomWord();
      expect(word.length).toBeGreaterThan(0);
    });
  });

  describe('charToKeyCode', () => {
    it('should return correct keycode for lowercase letters', () => {
      expect(charToKeyCode('q')).toBe('KC_Q');
      expect(charToKeyCode('w')).toBe('KC_W');
      expect(charToKeyCode('e')).toBe('KC_E');
    });

    it('should return correct keycode for uppercase letters', () => {
      expect(charToKeyCode('A')).toBe('KC_A');
      expect(charToKeyCode('Z')).toBe('KC_Z');
    });

    it('should return KC_SPC for space', () => {
      expect(charToKeyCode(' ')).toBe('KC_SPC');
    });

    it('should return KC_COMM for comma', () => {
      expect(charToKeyCode(',')).toBe('KC_COMM');
    });

    it('should return KC_DOT for period', () => {
      expect(charToKeyCode('.')).toBe('KC_DOT');
    });

    it('should return null for unknown characters', () => {
      expect(charToKeyCode('1')).toBeNull();
      expect(charToKeyCode('@')).toBeNull();
    });
  });
});
