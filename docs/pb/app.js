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
        fetch('data.json')
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
            <div key={index} className="match">
                <div class='data-tooltip'>
                    <pre>[{match.award.players}] {match.award.value} </pre>
                    <span class='data-tooltip-content'>
                        <small><small><pre style={{ background: 'Black', color: 'white', padding: '8px' }}>{match.enriched_chart_str}</pre></small></small>
                    </span>
                </div>
            </div>
        )
    }
}

// Render the React component to the DOM
ReactDOM.render(<AppComponent />, document.getElementById('app_component'));
