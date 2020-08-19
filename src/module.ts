import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';
import { JsonEditor } from './JsonEditor';

export const plugin = new PanelPlugin<SimpleOptions>(
  SimplePanel
).setPanelOptions(builder => {
  return builder.addCustomEditor({
    path: 'spec',
    name: 'Vega Spec',
    id: 'specEdit',
    editor: JsonEditor,
  });
});
