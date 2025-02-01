import { ImageResponse } from "@vercel/og";
import dayjs from "dayjs";
import { NextRequest } from "next/server";
import { fileURLToPath } from "url";

export const revalidate = 60;

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
  hideHeader,
  isLight,
  baseColor,
  hideLogo,
}: {
  collection: any;
  style: any;
  children: any;
  hideHeader?: boolean;
  isLight?: boolean;
  baseColor: string;
  hideLogo: string;
}) => (
  <div
    style={{
      padding: 40,
      borderRadius: 30,
      color: isLight ? `hsl(${baseColor}, 40%)` : `hsl(${baseColor}, 50%)`,
      fontFamily: "'Jost'",
      background: isLight ? `hsl(${baseColor}, 90%)` : `hsl(${baseColor}, 17%)`,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 40,
    }}
  >
    {!hideHeader && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 30,
          paddingLeft: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 110,
            height: 110,
            borderRadius: 20,
            background: isLight
              ? `hsl(${baseColor}, 83%)`
              : `hsl(${baseColor}, 20%)`,
          }}
        >
          <Emoji size={64} emoji={collection.emoji} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 50, fontWeight: 900 }}>
            {collection.name}
          </span>
          {collection.createdBy?.profile && (
            <span style={{ fontSize: 40, fontWeight: 500, marginTop: -7 }}>
              by{" "}
              {collection.keepAuthorAnonymous
                ? "Anonymous"
                : collection.createdBy?.profile?.name || "Anonymous"}
            </span>
          )}
        </div>
        {!hideLogo && (
          <img
            src="https://assets.dysperse.com/monochrome-small.png"
            width={80}
            height={80}
            style={{ marginLeft: "auto", opacity: 0.5 }}
          />
        )}
      </div>
    )}
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

function Preview({
  large,
  showToolbar,
  view,
  collection,
  hideHeader,
  isLight,
  baseColor,
  hideLogo,
}: {
  large: any;
  showToolbar: any;
  view: any;
  collection: any;
  hideHeader: any;
  isLight: any;
  baseColor: any;
  hideLogo: any;
}) {
  const labels = collection?.labels || [];

  switch (view) {
    case "pano":
      return (
        <Container
          hideLogo={hideLogo}
          baseColor={baseColor}
          isLight={isLight}
          hideHeader={hideHeader}
          collection={collection}
          style={{ gap: 20 }}
        >
          {["Today", "Week", "Month", "Year"].map((i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                padding: 20,
                paddingLeft: 30,
                flex: 1,
                fontSize: 40,
                background: isLight
                  ? `hsl(${baseColor}, 85%)`
                  : `hsl(${baseColor}, 20%)`,
                borderRadius: 20,
              }}
            >
              {i}
            </div>
          ))}
        </Container>
      );
    case "planner":
      return (
        <Container
          hideLogo={hideLogo}
          baseColor={baseColor}
          isLight={isLight}
          hideHeader={hideHeader}
          collection={collection}
          style={{ gap: 20 }}
        >
          {new Array(7).fill(0).map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                padding: 20,
                flex: 1,
                fontSize: 40,
                background: isLight
                  ? `hsl(${baseColor}, 85%)`
                  : `hsl(${baseColor}, 20%)`,
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
        <Container
          hideLogo={hideLogo}
          baseColor={baseColor}
          isLight={isLight}
          hideHeader={hideHeader}
          collection={collection}
          style={{ gap: 10 }}
        >
          {labels.slice(0, LABEL_LENGTH).map((label: any) => (
            <div
              key={label.name}
              style={{
                gap: 30,
                padding: "20px",
                paddingTop: "20px",
                paddingBottom: "20px",
                flex: 1,
                background: isLight
                  ? `hsl(${baseColor}, 85%)`
                  : `hsl(${baseColor}, 20%)`,
                borderRadius: 20,
                whiteSpace: "nowrap",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: hideHeader ? 550 : 385,
              }}
            >
              <Emoji size={64} emoji={label.emoji} />
              <div
                style={{
                  width: 40,
                  paddingBottom: 15,
                  height: hideHeader ? 350 : 220,
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
                    width: hideHeader ? 350 : 220,
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
                background: isLight
                  ? `hsl(${baseColor}, 85%)`
                  : `hsl(${baseColor}, 20%)`,
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
                  marginBottom: 14,
                  background: isLight
                    ? `hsl(${baseColor}, 86.5%)`
                    : `hsl(${baseColor}, 18.5%)`,
                  borderRadius: 20,
                }}
              />
            ))}
        </Container>
      );
    case "stream":
      return (
        <Container
          hideLogo={hideLogo}
          baseColor={baseColor}
          isLight={isLight}
          hideHeader={hideHeader}
          collection={collection}
          style={{ flexDirection: "column", gap: 20 }}
        >
          {["Backlog", "Upcoming", "Completed", "Unscheduled"].map(
            (label: any) => (
              <div
                key={label}
                style={{
                  background: isLight
                    ? `hsl(${baseColor}, 85%)`
                    : `hsl(${baseColor}, 20%)`,
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
          hideLogo={hideLogo}
          baseColor={baseColor}
          isLight={isLight}
          hideHeader={hideHeader}
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
                background: isLight
                  ? `hsl(${baseColor}, 85%)`
                  : `hsl(${baseColor}, 20%)`,
                borderRadius: 20,
                padding: 10,
                paddingRight: 20,
                paddingLeft: 20,
                width: "555px",
                height: hideHeader ? "268px" : "190px",
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
                  background: isLight
                    ? `hsl(${baseColor}, 86.5%)`
                    : `hsl(${baseColor}, 18.5%)`,
                  borderRadius: 20,
                  padding: 10,
                  width: "555px",
                  height: hideHeader ? "268px" : "190px",
                }}
              />
            ))}
        </Container>
      );
    case "workload":
      return (
        <Container
          hideLogo={hideLogo}
          baseColor={baseColor}
          isLight={isLight}
          hideHeader={hideHeader}
          collection={collection}
          style={{ gap: 20 }}
        >
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
                background: isLight
                  ? `hsl(${baseColor}, 85%)`
                  : `hsl(${baseColor}, 20%)`,
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
                  background: isLight
                    ? `hsl(${baseColor}, 85%)`
                    : `hsl(${baseColor}, 20%)`,
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
              >
                {text}
              </span>
            </div>
          ))}
        </Container>
      );
    case "list":
      const LABELS_LENGTH = 4;

      return (
        <Container
          hideLogo={hideLogo}
          baseColor={baseColor}
          isLight={isLight}
          hideHeader={hideHeader}
          collection={collection}
          style={{ flexDirection: "column", gap: 10 }}
        >
          {labels.slice(0, LABELS_LENGTH).map((label: any) => (
            <div
              key={label.name}
              style={{
                justifyContent: "flex-start",
                paddingLeft: 20,
                background: isLight
                  ? `hsl(${baseColor}, 85%)`
                  : `hsl(${baseColor}, 20%)`,
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
          {labels.length > LABELS_LENGTH && (
            <div
              style={{
                justifyContent: "center",
                background: isLight
                  ? `hsl(${baseColor}, 85%)`
                  : `hsl(${baseColor}, 20%)`,
                fontWeight: 900,
                flex: 1,
                borderRadius: 20,
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <span style={{ fontSize: 25 }}>
                +{labels.length - LABELS_LENGTH}
              </span>
            </div>
          )}
          {labels.length < LABELS_LENGTH &&
            new Array(LABELS_LENGTH - labels.length).fill(0).map((_, i) => (
              <div
                key={i}
                style={{
                  justifyContent: "center",
                  background: isLight
                    ? `hsl(${baseColor}, 86.5%)`
                    : `hsl(${baseColor}, 18.5%)`,
                  fontWeight: 900,
                  flex: 1,
                  borderRadius: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                }}
              />
            ))}
        </Container>
      );
    case "matrix":
      return (
        <Container
          hideLogo={hideLogo}
          baseColor={baseColor}
          isLight={isLight}
          hideHeader={hideHeader}
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
                  background: isLight
                    ? `hsl(${baseColor}, 85%)`
                    : `hsl(${baseColor}, 20%)`,
                  borderRadius: 20,
                  padding: 10,
                  flex: 1,
                }}
              />
              <div
                style={{
                  background: isLight
                    ? `hsl(${baseColor}, 85%)`
                    : `hsl(${baseColor}, 20%)`,
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
                  background: isLight
                    ? `hsl(${baseColor}, 85%)`
                    : `hsl(${baseColor}, 20%)`,
                  borderRadius: 20,
                  padding: 10,
                  flex: 1,
                }}
              />
              <div
                style={{
                  background: isLight
                    ? `hsl(${baseColor}, 85%)`
                    : `hsl(${baseColor}, 20%)`,
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
          hideLogo={hideLogo}
          baseColor={baseColor}
          isLight={isLight}
          hideHeader={hideHeader}
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
                width: 1200 / 7 - 20,
                padding: 10,
                background: isLight
                  ? `hsl(${baseColor}, 83%)`
                  : `hsl(${baseColor}, 23%)`,
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
                width: 1200 / 7 - 20,
                height: hideHeader ? 92 : 60,
                padding: 10,
                background: isLight
                  ? `hsl(${baseColor}, 85%)`
                  : `hsl(${baseColor}, 20%)`,
                borderRadius: 4,
                justifyContent: "center",
              }}
            />
          ))}
        </Container>
      );

    case "map":
      return (
        <Container
          hideLogo={hideLogo}
          baseColor={baseColor}
          isLight={isLight}
          hideHeader={hideHeader}
          collection={collection}
          style={{ gap: 20 }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              flex: 1,
              flexDirection: "column",
            }}
          >
            {[...new Array(7)].map((_, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  flex: 2,
                  padding: 20,
                  background: isLight
                    ? `hsl(${baseColor}, 85%)`
                    : `hsl(${baseColor}, 20%)`,
                  borderRadius: 20,
                  justifyContent: "center",
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              flex: 3,
              background: isLight
                ? `hsl(${baseColor}, 85%)`
                : `hsl(${baseColor}, 20%)`,
              borderRadius: 20,
              overflow: "hidden",
              justifyContent: "center",
            }}
          >
            <img
              src={
                process.env.NODE_ENV === "production"
                  ? "https://og.dysperse.com/map.png"
                  : "http://localhost:3000/map.png"
              }
              width={500}
              style={{
                width: "100%",
                objectFit: "cover",
                // objectPosition: "1cm 2cm",
                height: "100%",
              }}
            />
          </div>
        </Container>
      );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; data?: any } }
) {
  try {
    const query = req.nextUrl.searchParams;

    const [data, jostBlack, jostRegular, jostSemiBold] = await Promise.all([
      fetch("https://api.dysperse.com/dysverse?id=" + params.id).then((res) =>
        res.json()
      ),
      fetch("https://assets.dysperse.com/jost/Jost-Black.ttf").then((res) =>
        res.arrayBuffer()
      ),
      fetch("https://assets.dysperse.com/jost/Jost-Regular.ttf").then((res) =>
        res.arrayBuffer()
      ),
      fetch("https://assets.dysperse.com/jost/Jost-SemiBold.ttf").then((res) =>
        res.arrayBuffer()
      ),
    ]);
    console.log("THIS IS IT", query.get("json"));
    const template = query.get("json")
      ? JSON.parse(query.get("json") as any)
      : data[0];

    // Types: planner, kanban, stream, grid, workload, list, matrix, calendar
    return new ImageResponse(
      (
        <Preview
          large={query.get("large")}
          showToolbar={query.get("showToolbar")}
          baseColor={template.baseColor || "0, 0%"}
          view={template.defaultView || "kanban"}
          hideHeader={query.get("hideHeader") === "true"}
          isLight={query.get("isLight") === "true"}
          hideLogo={query.get("hideLogo") === "true"}
          collection={template}
        />
      ),
      {
        fonts: [
          {
            data: jostRegular,
            name: "Jost",
            style: "normal",
            weight: 200,
          },
          {
            data: jostSemiBold,
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

