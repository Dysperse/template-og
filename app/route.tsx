import { ImageResponse } from "@vercel/og";
import dayjs from "dayjs";
import { NextRequest } from "next/server";
import { fileURLToPath } from "url";

function Emoji({
  size = 24,
  emoji,
  style = {},
}: {
  size?: number;
  emoji: string;
  style?: any;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      width={size}
      height={size}
      alt="Emoji"
      src={`https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/${emoji?.toLowerCase()}.png`}
    />
  );
}

const Container = ({
  children,
  style,
  collection,
}: {
  collection: any;
  style: any;
  children: any;
}) => (
  <div
    style={{
      padding: 20,
      borderRadius: 20,
      color: "hsl(0, 0%, 50%)",
      fontFamily: "'Jost'",
      background: "hsl(0, 0%, 17%)",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 20,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        paddingLeft: 10,
      }}
    >
      <Emoji size={40} emoji={collection.emoji} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 27, fontWeight: 900 }}>{collection.name}</span>
        <span style={{ fontSize: 16, fontWeight: 200 }}>
          by{" "}
          {collection.keepAuthorAnonymous
            ? "Anonymous"
            : collection.createdBy.profile?.name || "Anonymous"}
        </span>
      </div>
      <img
        src="https://assets.dysperse.com/monochrome-small.png"
        width={64}
        height={64}
        style={{ marginLeft: "auto", opacity: 0.5 }}
      />
    </div>
    <div
      style={{
        display: "flex",
        fontWeight: 900,
        gap: 0.5,
        flex: 1,
        ...style,
      }}
    >
      {children}
    </div>
  </div>
);

function Preview({ large, showToolbar, view, collection }: any) {
  const labels = collection.labels;

  switch (view) {
    case "planner":
      return (
        <Container collection={collection} style={{ gap: 20 }}>
          {new Array(7).fill(0).map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                padding: 20,
                flex: 1,
                fontSize: 40,
                background: "hsl(0, 0%, 20%)",
                borderRadius: 20,
                justifyContent: "center",
              }}
            >
              {dayjs().startOf("week").add(i, "day").format("dddd")[0]}
            </div>
          ))}
        </Container>
      );
    case "kanban":
      const LABEL_LENGTH = 6;

      return (
        <Container collection={collection} style={{ gap: 10 }}>
          {labels.slice(0, LABEL_LENGTH).map((label: any) => (
            <div
              key={label.name}
              style={{
                gap: 30,
                padding: "20px",
                paddingTop: "20px",
                paddingBottom: "20px",
                flex: 1,
                background: "hsl(0, 0%, 20%)",
                borderRadius: 20,
                whiteSpace: "nowrap",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: 505,
              }}
            >
              <Emoji size={64} emoji={label.emoji} />
              <div
                style={{
                  width: 40,
                  paddingBottom: 15,
                  height: 505 - 20 - 64 - 20 - 30,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: 30,
                    height: 46,
                    width: 505 - 20 - 64 - 20 - 20 - 30,
                    transform: "rotate(90deg)",
                  }}
                >
                  {label.name}
                </span>
              </div>
            </div>
          ))}
          {labels.length > LABEL_LENGTH && (
            <div
              style={{
                gap: 10,
                padding: 20,
                flex: 1,
                background: "hsl(0, 0%, 20%)",
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                }}
              >
                +{labels.length - LABEL_LENGTH}
              </h1>
            </div>
          )}
          {labels.length < LABEL_LENGTH &&
            new Array(LABEL_LENGTH - labels.length).fill(0).map((_, i) => (
              <div
                key={i}
                style={{
                  gap: 10,
                  padding: 20,
                  flex: 1,
                  background: "hsl(0, 0%, 20%)",
                  borderRadius: 20,
                }}
              />
            ))}
        </Container>
      );
    case "stream":
      return (
        <Container
          collection={collection}
          style={{ flexDirection: "column", gap: 20 }}
        >
          {["Backlog", "Upcoming", "Completed", "Unscheduled"].map(
            (label: any) => (
              <div
                key={label}
                style={{
                  background: "hsl(0, 0%, 20%)",
                  color: "hsl(0, 0%, 50%)",
                  fontWeight: 900,
                  flex: 1,
                  borderRadius: 20,
                  alignItems: "center",
                  padding: 20,
                  display: "flex",
                }}
              >
                <span style={{ fontSize: 25 }}>{label}</span>
              </div>
            )
          )}
        </Container>
      );
    case "grid":
      const t = labels.splice(0, 4);
      return (
        <Container
          collection={collection}
          style={{
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          {t.map((label: any) => (
            <div
              key={label.name}
              style={{
                background: "hsl(0, 0%, 20%)",
                borderRadius: 20,
                padding: 10,
                paddingRight: 20,
                paddingLeft: 20,
                width: "575px",
                height: "250px",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <Emoji emoji={label.emoji} size={50} />
              <span
                style={{
                  fontSize: 30,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  minWidth: 0,
                  maxWidth: "100%",
                }}
              >
                {label.name}
              </span>
            </div>
          ))}
          {t.length < 4 &&
            new Array(4 - t.length).fill(0).map((_, i) => (
              <div
                key={i}
                style={{
                  background: "hsl(0, 0%, 20%)",
                  borderRadius: 4,
                  padding: 10,
                }}
              />
            ))}
        </Container>
      );
    case "workload":
      return (
        <Container collection={collection} style={{ gap: 20 }}>
          {[
            [2, "Minimum Effort"],
            [4, "Little Effort"],
            [8, "Moderate Effort"],
            [16, "Significant Effort"],
            [32, "Maximum Effort"],
          ].map(([number, text]) => (
            <div
              key={text}
              style={{
                gap: 15,
                padding: 20,
                paddingTop: 30,
                fontWeight: 200,
                flex: 1,
                background: "hsl(0, 0%, 20%)",
                borderRadius: 20,
                whiteSpace: "nowrap",
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 99,
                  fontSize: 40,
                  background: "hsl(0, 0%, 25%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontWeight: 900 }}>{number}</span>
              </div>
              <span
                style={{
                  whiteSpace: "wrap",
                  textAlign: "center",
                  fontSize: 40,
                }}
                fontWeight={700}
              >
                {text}
              </span>
            </div>
          ))}
        </Container>
      );
    case "list":
      return (
        <Container
          collection={collection}
          style={{ flexDirection: "column", gap: 10 }}
        >
          {labels.map((label: any) => (
            <div
              key={label.name}
              label={label.name}
              style={{
                justifyContent: "flex-start",
                paddingLeft: 20,
                background: "hsl(0, 0%, 20%)",
                color: "hsl(0, 0%, 50%)",
                fontWeight: 900,
                flex: 1,
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <Emoji size={35} emoji={label.emoji} />
              <span style={{ fontSize: 25 }}>{label.name}</span>
            </div>
          ))}
        </Container>
      );
    case "matrix":
      return (
        <Container
          collection={collection}
          style={{
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: 100,
              justifyContent: "space-around",
              width: 50,
            }}
          >
            <span
              style={{
                fontWeight: 900,
                fontSize: 20,
                transform: "rotate(-90deg)",
              }}
            >
              Important
            </span>
            <span
              style={{
                fontWeight: 900,
                fontSize: 20,
                transform: "rotate(-90deg)",
              }}
            >
              Urgent
            </span>
          </div>
          <div style={{ display: "flex", flex: 1, gap: 10 }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <span
                style={{
                  fontWeight: 900,
                  fontSize: 20,
                  justifyContent: "center",
                }}
              >
                Not urgent
              </span>
              <div
                style={{
                  background: "hsl(0, 0%, 20%)",
                  borderRadius: 20,
                  padding: 10,
                  flex: 1,
                }}
              />
              <div
                style={{
                  background: "hsl(0, 0%, 20%)",
                  borderRadius: 20,
                  padding: 10,
                  flex: 1,
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <span
                style={{
                  fontWeight: 900,
                  fontSize: 20,
                  justifyContent: "center",
                }}
              >
                Not important
              </span>
              <div
                style={{
                  background: "hsl(0, 0%, 20%)",
                  borderRadius: 20,
                  padding: 10,
                  flex: 1,
                }}
              />
              <div
                style={{
                  background: "hsl(0, 0%, 20%)",
                  borderRadius: 20,
                  padding: 10,
                  flex: 1,
                }}
              />
            </div>
          </div>
        </Container>
      );
    case "calendar":
      return (
        <Container
          collection={collection}
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          {new Array(7).fill(0).map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                width: 157,
                padding: 10,
                background: "hsl(0, 0%, 23%)",
                borderRadius: 4,
                justifyContent: "center",
              }}
            >
              {dayjs().startOf("week").add(i, "day").format("dddd")[0]}
            </div>
          ))}
          {new Array(35).fill(0).map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                width: 157,
                height: 82.5,
                padding: 10,
                background: "hsl(0, 0%, 20%)",
                borderRadius: 4,
                justifyContent: "center",
              }}
            />
          ))}
        </Container>
      );
  }
}

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams;
    if (!query.get("id")) throw new Error("id is required");

    const id = query.get("id");

    const data = await fetch("https://api.dysperse.com/dysverse?id=" + id).then(
      (res) => res.json()
    );

    const jostBlack = await fetch(
      "https://assets.dysperse.com/jost/Jost-Black.ttf"
    ).then((res) => res.arrayBuffer());

    const jostRegular = await fetch(
      "https://assets.dysperse.com/jost/Jost-Regular.ttf"
    ).then((res) => res.arrayBuffer());

    const template = data[0];

    return new ImageResponse(
      <Preview view={template.defaultView} collection={template} />,
      {
        fonts: [
          {
            data: jostRegular,
            name: "Jost",
            style: "normal",
            weight: 500,
          },
          {
            data: jostBlack,
            name: "Jost",
            style: "normal",
            weight: 900,
          },
        ],
      }
    );
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}

