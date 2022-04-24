import '../Styling/timeline.css'

const timelineData = [
    {
        text: 'Mario',
        date: 'February 25 2019',
        category: {
			tag: 'app-ideas',
			color: '#FFDB14'
		},
        link: {
            text: 'Link to mario'
        }
    },
    {
        text: 'Sonic',
        date: 'March 04 2019',
        category: {
			tag: 'blog',
			color: '#e17b77'
		},
        link: {
            text: 'Link to sonic'
        }
    },
    {
        text: 'Call of duty',
        date: 'March 07 2019',
        category: {
			tag: 'twitter',
			color: '#1DA1F2'
		},
        link: {
            text: 'Link to call of duty'
        }
    },
    {
        text: 'Mario',
        date: 'February 25 2019',
        category: {
			tag: 'app-ideas',
			color: '#FFDB14'
		},
        link: {
            text: 'Link to mario'
        }
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