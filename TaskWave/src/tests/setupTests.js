// src/tests/setupTests.js
import '@testing-library/jest-dom';
import { expect } from 'vitest';

// Make expect globally available
global.expect = expect;
