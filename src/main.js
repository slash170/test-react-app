/* @flow */
var Counter = React.createClass({
    getInitialState: function() {
        return {count: 0};
    },

    handlePlus: function () {
        this.setState({
            count: this.state.count + 1
        });
    },

    handleMinus: function () {
        this.setState({
            count: this.state.count - 1
        });
    },

    render: function() {
        return (
            <div>
                <h3>{this.props.name}の個数</h3>
                <button onClick={this.handlePlus}>プラス!</button>
                <div>{this.state.count}個</div>
                <button onClick={this.handleMinus}>マイナス</button>
            </div>
        );
    }
});
var counters = (
    <div>
    <Counter name="りんご" />
    </div>
);

var content = document.getElementById('content');
ReactDOM.render(counters, content);
