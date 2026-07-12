"use client";

import { motion } from "framer-motion";
import { viewportOnce } from "@/lib/motion";

/**
 * An animated reference architecture — the shape of most systems I build:
 * clients through a gateway to services, backed by Postgres/cache/queue,
 * with observability watching everything. Lines draw in on scroll and
 * request "packets" flow continuously.
 */

const boxes = [
  { id: "client", x: 20, y: 96, w: 110, h: 48, label: "Clients", sub: "web · mobile · IoT" },
  { id: "gateway", x: 200, y: 96, w: 110, h: 48, label: "API Gateway", sub: "auth · rate limits" },
  { id: "svc-a", x: 380, y: 24, w: 120, h: 48, label: "Core Service", sub: "NestJS" },
  { id: "svc-b", x: 380, y: 96, w: 120, h: 48, label: "Payments", sub: "idempotent" },
  { id: "svc-c", x: 380, y: 168, w: 120, h: 48, label: "Ingest", sub: "MQTT · events" },
  { id: "db", x: 580, y: 24, w: 110, h: 48, label: "PostgreSQL", sub: "tuned indexes" },
  { id: "cache", x: 580, y: 96, w: 110, h: 48, label: "Cache", sub: "explicit TTLs" },
  { id: "queue", x: 580, y: 168, w: 110, h: 48, label: "Queue", sub: "retries · DLQ" },
  { id: "obs", x: 380, y: 246, w: 310, h: 44, label: "Observability", sub: "Prometheus · Grafana · Alertmanager" },
];

const edges = [
  { d: "M130 120 H200", flow: true },
  { d: "M310 120 H345 Q360 120 360 105 V63 Q360 48 375 48 H380", flow: true },
  { d: "M310 120 H380", flow: true },
  { d: "M310 120 H345 Q360 120 360 135 V177 Q360 192 375 192 H380", flow: true },
  { d: "M500 48 H580", flow: true },
  { d: "M500 120 H580", flow: false },
  { d: "M500 192 H580", flow: true },
  // observability taps
  { d: "M440 216 V246", flow: false },
  { d: "M535 246 V232 Q535 216 550 216 H560 Q575 216 575 200 V192", flow: false },
];

export function ArchitectureDiagram() {
  return (
    <div className="card-surface overflow-x-auto p-4 md:p-8">
      <svg
        viewBox="0 0 710 310"
        role="img"
        aria-label="Reference backend architecture: clients call an API gateway which routes to services backed by PostgreSQL, a cache, and a queue, all monitored by an observability stack"
        className="min-w-[640px]"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L8 4 L0 8 z" fill="hsl(var(--muted-foreground) / 0.5)" />
          </marker>
        </defs>

        {/* Edges */}
        {edges.map((edge, i) => (
          <g key={i}>
            <motion.path
              d={edge.d}
              fill="none"
              stroke="hsl(var(--muted-foreground) / 0.35)"
              strokeWidth="1.2"
              markerEnd="url(#arrow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
            />
            {edge.flow && (
              <circle r="2.5" fill="hsl(var(--accent))">
                <animateMotion
                  dur={`${2.4 + (i % 3) * 0.7}s`}
                  repeatCount="indefinite"
                  path={edge.d}
                  begin={`${i * 0.5}s`}
                />
              </circle>
            )}
          </g>
        ))}

        {/* Nodes */}
        {boxes.map((box, i) => (
          <motion.g
            key={box.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: i * 0.07 }}
          >
            <rect
              x={box.x}
              y={box.y}
              width={box.w}
              height={box.h}
              rx="10"
              fill="hsl(var(--card))"
              stroke={
                box.id === "obs"
                  ? "hsl(var(--accent-secondary) / 0.5)"
                  : "hsl(var(--border))"
              }
            />
            <text
              x={box.x + box.w / 2}
              y={box.y + 20}
              textAnchor="middle"
              className="fill-[hsl(var(--foreground))]"
              fontSize="11.5"
              fontWeight="600"
            >
              {box.label}
            </text>
            <text
              x={box.x + box.w / 2}
              y={box.y + 35}
              textAnchor="middle"
              className="fill-[hsl(var(--muted-foreground))]"
              fontSize="9"
            >
              {box.sub}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
