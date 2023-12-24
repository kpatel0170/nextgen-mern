const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { NodeHttpTraceExporter } = require("@opentelemetry/exporter-trace-otlp-http");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");

const { OTEL_ENABLED, OTEL_SERVICE_NAME, OTEL_EXPORTER_JAEGER_ENDPOINT } = process.env;

async function initializeTracing() {
  if (OTEL_ENABLED === "true") {
    const exporter = new NodeHttpTraceExporter({
      serviceName: OTEL_SERVICE_NAME,
      url: OTEL_EXPORTER_JAEGER_ENDPOINT
    });

    const provider = new NodeTracerProvider();
    provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
    provider.register();

    registerInstrumentations({
      instrumentations: [getNodeAutoInstrumentations()]
    });
  } else {
    console.log("OpenTelemetry tracing is disabled.");
  }
}

async function startTracing() {
  try {
    await initializeTracing();
    console.log("OpenTelemetry tracing initialized successfully.");
  } catch (error) {
    console.error("Error initializing OpenTelemetry tracing:", error);
    // Implement proper error handling or fallback mechanisms here.
  }
}

startTracing();
