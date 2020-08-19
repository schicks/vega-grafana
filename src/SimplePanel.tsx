import React from 'react';
import { PanelProps, DataFrame, Vector } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { Vega, VisualizationSpec } from 'react-vega';

const toRows = (df: DataFrame): Array<{}> => {
  const fieldNames = df.fields.map(a => a.name);
  const fieldMap: { [key: string]: Vector } = df.fields.reduce((acc, a) => {
    return {
      ...acc,
      [a.name]: a.values,
    };
  }, {});

  return df.fields[0].values.toArray().map((_, i) =>
    fieldNames.reduce((acc, name) => {
      return {
        ...acc,
        [name]: fieldMap[name].get(i),
      };
    }, {})
  );
};

const DataFrameToVegaData = (
  series: DataFrame[]
): { [key: string]: Array<{}> } => {
  return series.reduce((acc, a, i) => {
    return {
      ...acc,
      [a.name ?? `${i}`]: toRows(a),
    };
  }, {});
};

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({
  options: { spec: specString },
  data,
  width,
  height,
}) => {
  const styles = getStyles();
  const [spec, setSpec] = React.useState<VisualizationSpec>({});

  React.useEffect(() => {
    try {
      setSpec({
        width: (width * 4) / 5,
        height: (height * 3) / 4,
        data: { name: data.series[0].name ?? '0' },
        ...JSON.parse(specString),
      });
    } catch {}
  }, [specString, width, height, data.series[0]?.name]);

  const vegaData = React.useMemo(
    () => DataFrameToVegaData(data.series),
    data.series
  );

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <Vega spec={spec} data={vegaData} />
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
