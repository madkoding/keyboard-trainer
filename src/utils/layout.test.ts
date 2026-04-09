import { describe, it, expect } from 'vitest';
import { createHandLayout, createFingerMap, FINGER_NAMES, FINGER_COLORS } from '../utils/layout';

describe('layout utils', () => {
  describe('createHandLayout', () => {
    it('should create layout with left and right hands', () => {
      const layout = createHandLayout();
      expect(layout.left).toBeDefined();
      expect(layout.right).toBeDefined();
    });

    it('should have 3 rows per hand', () => {
      const layout = createHandLayout();
      expect(layout.left.length).toBe(3);
      expect(layout.right.length).toBe(3);
    });

    it('should have 5 columns per row', () => {
      const layout = createHandLayout();
      layout.left.forEach(row => expect(row.length).toBe(5));
      layout.right.forEach(row => expect(row.length).toBe(5));
    });

    it('should have correct key labels', () => {
      const layout = createHandLayout();
      expect(layout.left[0][0].label).toBe('Q');
      expect(layout.left[0][1].label).toBe('W');
      expect(layout.right[0][0].label).toBe('Y');
    });
  });

  describe('createFingerMap', () => {
    it('should create finger map with left and right', () => {
      const fingerMap = createFingerMap();
      expect(fingerMap.left).toBeDefined();
      expect(fingerMap.right).toBeDefined();
    });

    it('should have finger 0 (pinky) on leftmost column of left hand', () => {
      const fingerMap = createFingerMap();
      expect(fingerMap.left[0][0]).toBe(0);
    });

    it('should have finger 4 (thumb) on rightmost column of left hand', () => {
      const fingerMap = createFingerMap();
      expect(fingerMap.left[0][4]).toBe(4);
    });

    it('should have finger 4 (thumb) on leftmost column of right hand', () => {
      const fingerMap = createFingerMap();
      expect(fingerMap.right[0][0]).toBe(4);
    });

    it('should have finger 0 (pinky) on rightmost column of right hand', () => {
      const fingerMap = createFingerMap();
      expect(fingerMap.right[0][4]).toBe(0);
    });
  });

  describe('FINGER_NAMES', () => {
    it('should have all 5 finger names', () => {
      expect(FINGER_NAMES[0]).toBe('Meñique');
      expect(FINGER_NAMES[1]).toBe('Anular');
      expect(FINGER_NAMES[2]).toBe('Medio');
      expect(FINGER_NAMES[3]).toBe('Índice');
      expect(FINGER_NAMES[4]).toBe('Pulgar');
    });
  });

  describe('FINGER_COLORS', () => {
    it('should have a color for each finger', () => {
      expect(Object.keys(FINGER_COLORS).length).toBe(5);
      expect(FINGER_COLORS[0]).toMatch(/^#/);
      expect(FINGER_COLORS[4]).toMatch(/^#/);
    });
  });
});
