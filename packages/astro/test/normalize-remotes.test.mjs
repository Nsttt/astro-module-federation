import test from 'node:test';
import assert from 'node:assert/strict';

import { buildHostAutoInitImportId, normalizeRemotes } from '../dist/index.js';

test('normalizes core-style remote value name@url into remote object config', () => {
  const remotes = normalizeRemotes({
    remote: 'remote@http://localhost:4173/mf-manifest.json',
  });

  assert.deepEqual(remotes, {
    remote: {
      type: 'var',
      name: 'remote',
      entry: 'http://localhost:4173/mf-manifest.json',
      entryGlobalName: 'remote',
      shareScope: 'default',
    },
  });
});

test('normalizes plain url remotes using the remote key as global name', () => {
  const remotes = normalizeRemotes({
    remote: 'http://localhost:4173/mf-manifest.json',
  });

  assert.deepEqual(remotes, {
    remote: {
      type: 'var',
      name: 'remote',
      entry: 'http://localhost:4173/mf-manifest.json',
      entryGlobalName: 'remote',
      shareScope: 'default',
    },
  });
});

test('keeps non-url @ strings unchanged', () => {
  const remotes = normalizeRemotes({
    remote: '@scope/remote',
  });

  assert.deepEqual(remotes, {
    remote: '@scope/remote',
  });
});

test('keeps object remotes unchanged', () => {
  const remotes = normalizeRemotes({
    remote: {
      name: 'remote',
      entry: 'http://localhost:4173/mf-manifest.json',
    },
  });

  assert.deepEqual(remotes, {
    remote: {
      name: 'remote',
      entry: 'http://localhost:4173/mf-manifest.json',
    },
  });
});

test('builds deterministic host auto init virtual module id', () => {
  const moduleId = buildHostAutoInitImportId('astro_host');

  assert.equal(
    moduleId,
    '__mf__virtual/astro_host__H_A_I__hostAutoInit__H_A_I__.js',
  );
});
