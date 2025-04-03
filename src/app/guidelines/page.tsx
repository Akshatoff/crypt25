import Link from "next/link";
import Back from "../components/Back";

const eventConfig = {
  startDate: new Date(2025, 4, 4, 12, 0, 0),
  endDate: new Date(2025, 4, 6, 12, 0, 0),
};

const duration = `${
  (eventConfig.endDate.getTime() - eventConfig.startDate.getTime()) / 3600000
} hours`;

function addOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

const startDate = eventConfig.startDate
  .toLocaleString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })
  .replace(" at", "")
  .replace(/\d+/, (day) => addOrdinalSuffix(parseInt(day)));

const endDate = eventConfig.endDate
  .toLocaleString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })
  .replace(" at", "")
  .replace(/\d+/, (day) => addOrdinalSuffix(parseInt(day)));

function CoverSection() {
  return (
    <div className="section centered cover veryIncompleteCover" id="home">
      <span className="subtitle">Crypt@trix</span>
      <h1 className="title">Guidelines</h1>
    </div>
  );
}

function Section1() {
  return (
    <>
      <div className="section centered" id="home">
        <p className="text">
          These guidelines are designed to help you understand the rules and
          expectations for using our platform. Please read them carefully and
          ensure that you comply with them at all times.
        </p>
        <ol>
          <li>
            Crypt@trix will be held for <b>{duration}</b>, from{" "}
            <b>{startDate}</b> to <b>{endDate}</b>. It may be extended on high
            demand.
          </li>
          <li>
            Hints will be provided periodically on the event Discord server and
            this website.
          </li>
          <li>Lead confirmations will be taking place throughout the hunt.</li>
          <li>
            The real-time <Link href="/leaderboard">leaderboard</Link> is
            available on the hunt's site.
          </li>
          <li>
            The time taken to complete a level may affect a team's standings on
            the leaderboard; speed matters. For example, if you solve a
            particular level in 60 minutes while someone else takes 90 minutes,
            you will be ranked higher on the board.
          </li>
          <li>
            The team on the top of the leaderboard when the timer runs out shall
            be deemed the winner.
          </li>
          <li>
            Please do not attempt exchanging flags or write-ups during the
            competition with other teams or exploit any other unfair means. No
            warnings would be given if caught and the involved parties may face
            disqualification.
          </li>
          <li>
            Please do not attempt using Brute Force on the flag submission
            system, although the flags are impossible to guess. Entering slashes
            or injections will lead to immediate disqualification.
          </li>
          <li>
            Further information may be available on the website in the future.
          </li>
        </ol>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <>
      <Back></Back>
      <CoverSection></CoverSection>
      <Section1></Section1>
    </>
  );
}
