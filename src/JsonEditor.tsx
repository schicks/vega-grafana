import * as React from 'react';
import { StandardEditorProps } from '@grafana/data';
import AceEditor from 'react-ace';

type Props = StandardEditorProps<string>;

export const JsonEditor = ({ value, onChange }: Props) => {
  return (
    <AceEditor
      mode="json"
      onChange={onChange}
      value={value}
      tabSize={2}
      showGutter={false}
    />
  );
};
