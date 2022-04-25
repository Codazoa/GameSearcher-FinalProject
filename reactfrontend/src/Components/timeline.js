import '../Styling/timeline.css'

const timelineData = [
    {
        text: 'Call of Duty 1',
        date: 'February 25 2019',
    },
    {
        text: 'Call of Duty 2',
        date: 'March 04 2019',
    },
    {
        text: 'Call of duty 3',
        date: 'March 07 2019',
    },
    {
        text: 'Call of Duty 4',
        date: 'February 25 2019',
    }
]

const TimelineItem = ({ data }) => (
    <div className="timeline-item">
        <div className="timeline-item-content">
            <p>{data.text}</p>
            <time>{data.date}</time>
            <span className="circle" />
        </div>
    </div>
);

const Timeline = () =>
    timelineData.length > 0 && (
            <div className="timeline-container">
                {timelineData.map((data, idx) => (
                    <TimelineItem data={data} key={idx} />
                ))}
            </div>
    );

export default Timeline;