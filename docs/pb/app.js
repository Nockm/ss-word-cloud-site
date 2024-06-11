// import styles from './styles.css';

class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        fetch('data/pb/data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => this.setState({ data, loading: false }))
            .catch(error => this.setState({ error, loading: false }));
    }

    render() {
        const { data, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        return (
            <div>
                <big><big><div>Work in progress, Just for fun! The data needs cleaning, I know.</div></big></big>
                {
                    data.podiums.map((x, y) => this.renderPodium(x, y))
                }
            </div>
        );
    }

    renderPodium(podium, index) {
        return (
            <div key={index} className="podium">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <pre className="metric">[{podium.metric.table_header}] {podium.metric.caption}</pre>
                            </td>
                            <td>{podium.top_matches.map((x, y) => this.renderMatch(x, y, podium.metric))}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    renderMatch(match, index, metric) {
        return (
            <div key={index} className="match" style={{ display: "flex" }}>
                <span className='data-tooltip'>
                    <a className="data" href="#">{match.award.players}</a>
                    <span className='data-tooltip-content'>
                        <img src={"data/pb/wordclouds/" + encodeURIComponent(match.award.players.join(", ").toLowerCase() + ".png")}></img>
                    </span>
                </span>
                <span className='data-tooltip'>
                    <a className="data" href="#">{match.award.value}</a>
                    <span className='data-tooltip-content'>
                        <small><small><pre style={{ background: 'Black', color: 'white', padding: '8px' }}>{match.enriched_chart_str}</pre></small></small>
                    </span>
                </span>
            </div >
        )
    }
}

// Render the React component to the DOM
ReactDOM.render(<AppComponent />, document.getElementById('app_component'));
