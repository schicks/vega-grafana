# Vega Grafana

This is a panel plugin for grafana that allows the creation of arbitrary vega charts within a grafana dashboard. It is configured with a [vega or vega lite spec](https://vega.github.io/vega-lite/tutorials/getting_started.html) and projects an arbitrary query from your grafana datasources into that view.

The primary goal of this plugin is to allow flexible, non time series visualizations to be included as part of a grafana dashboard. There are much higher quality and easier to use plugins for visualizing timeseries. However, in some cases [vega data transformations](https://vega.github.io/vega-lite/docs/transform.html) could be useful on timeseries data as well.