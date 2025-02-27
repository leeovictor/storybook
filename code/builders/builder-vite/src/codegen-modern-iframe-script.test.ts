import { describe, expect, it } from 'vitest';

import { generateModernIframeScriptCodeFromPreviews } from './codegen-modern-iframe-script';

const projectRoot = 'projectRoot';

describe('generateModernIframeScriptCodeFromPreviews', () => {
  it('handle one annotation', async () => {
    const result = await generateModernIframeScriptCodeFromPreviews({
      previewAnnotations: ['/user/previewAnnotations'],
      projectRoot,
      frameworkName: 'frameworkName',
    });
    expect(result).toMatchInlineSnapshot(`
      "import { setup } from 'storybook/internal/preview/runtime';

       import 'virtual:/@storybook/builder-vite/setup-addons.js';

       setup();

       import { composeConfigs, PreviewWeb } from 'storybook/internal/preview-api';
       import { isPreview } from 'storybook/internal/csf';
       import { importFn } from 'virtual:/@storybook/builder-vite/storybook-stories.js';
       
       import * as previewAnnotations_2477 from "/user/previewAnnotations";
        const getProjectAnnotations = (hmrPreviewAnnotationModules = []) => {
          const preview = hmrPreviewAnnotationModules[0] ? previewAnnotations_2477;
       
          if (isPreview(preview.default)) {
            return preview.default.composed;
          }
         
          const configs = []
          return composeConfigs([...configs, preview]);
        }

       window.__STORYBOOK_PREVIEW__ = window.__STORYBOOK_PREVIEW__ || new PreviewWeb(importFn, getProjectAnnotations);
       
       window.__STORYBOOK_STORY_STORE__ = window.__STORYBOOK_STORY_STORE__ || window.__STORYBOOK_PREVIEW__.storyStore;
       
       if (import.meta.hot) {
         import.meta.hot.accept('virtual:/@storybook/builder-vite/storybook-stories.js', (newModule) => {
           // importFn has changed so we need to patch the new one in
           window.__STORYBOOK_PREVIEW__.onStoriesChanged({ importFn: newModule.importFn });
         });
       
         import.meta.hot.accept(["/user/previewAnnotations"], (previewAnnotationModules) => {
           // getProjectAnnotations has changed so we need to patch the new one in
           window.__STORYBOOK_PREVIEW__.onGetProjectAnnotationsChanged({ getProjectAnnotations: () => getProjectAnnotations(previewAnnotationModules) });
         });
       };"
    `);
  });
  it('handle multiple annotations', async () => {
    const result = await generateModernIframeScriptCodeFromPreviews({
      previewAnnotations: ['/user/previewAnnotations1', '/user/previewAnnotations2'],
      projectRoot,
      frameworkName: 'frameworkName',
    });
    expect(result).toMatchInlineSnapshot(`
      "import { setup } from 'storybook/internal/preview/runtime';

       import 'virtual:/@storybook/builder-vite/setup-addons.js';

       setup();

       import { composeConfigs, PreviewWeb } from 'storybook/internal/preview-api';
       import { isPreview } from 'storybook/internal/csf';
       import { importFn } from 'virtual:/@storybook/builder-vite/storybook-stories.js';
       
       import * as previewAnnotations1_2526 from "/user/previewAnnotations1";
       import * as previewAnnotations2_2527 from "/user/previewAnnotations2";
        const getProjectAnnotations = (hmrPreviewAnnotationModules = []) => {
          const preview = hmrPreviewAnnotationModules[0] ? previewAnnotations1_2526;
       
          if (isPreview(preview.default)) {
            return preview.default.composed;
          }
         
          const configs = [
           hmrPreviewAnnotationModules[1] ?? previewAnnotations2_2527
         ]
          return composeConfigs([...configs, preview]);
        }

       window.__STORYBOOK_PREVIEW__ = window.__STORYBOOK_PREVIEW__ || new PreviewWeb(importFn, getProjectAnnotations);
       
       window.__STORYBOOK_STORY_STORE__ = window.__STORYBOOK_STORY_STORE__ || window.__STORYBOOK_PREVIEW__.storyStore;
       
       if (import.meta.hot) {
         import.meta.hot.accept('virtual:/@storybook/builder-vite/storybook-stories.js', (newModule) => {
           // importFn has changed so we need to patch the new one in
           window.__STORYBOOK_PREVIEW__.onStoriesChanged({ importFn: newModule.importFn });
         });
       
         import.meta.hot.accept(["/user/previewAnnotations1","/user/previewAnnotations2"], (previewAnnotationModules) => {
           // getProjectAnnotations has changed so we need to patch the new one in
           window.__STORYBOOK_PREVIEW__.onGetProjectAnnotationsChanged({ getProjectAnnotations: () => getProjectAnnotations(previewAnnotationModules) });
         });
       };"
    `);
  });
});
