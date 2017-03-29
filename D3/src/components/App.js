import React, { Component} from 'react'
const d3 = require('d3')
import {QuestionContainer, QuestionList} from './test'


function *flatten(a) {
    if (Array.isArray(a)) 
        for (var e of a) 
            yield *flatten(e)
    else 
        yield a
}

class ChartBase extends Component {    
    palette = ['coral', 'cadetblue', 'blueviolet', 'bisque', 'darkcyan', 'green', 'midnightblue', 'orangered']

    width = 600; height = 400; pad = 20
    axisThick = 4
    fullWidth = this.width + 4*this.pad
    fullHeight = this.height + 6*this.pad
    arrowHeight = 20; arrowWidth05 = 8
    barGapBase = 10; barWidthBase = 40; chartFillPercent = 0.95
}

class SvgBarChart extends ChartBase {
    
    render() {

        const {data, title} = this.props.graphData
                
        const len = data.length
        const xScale = this.width*this.chartFillPercent / (this.barWidthBase * len + this.barGapBase * len)
        const yScale = this.height*this.chartFillPercent / data.reduce((a, b) => Math.max(a, b.y), 0)        
        const barGap = this.barGapBase * xScale, 
              barWidth = this.barWidthBase * xScale

        const nthColor = i => this.palette[i % this.palette.length]
        const makeBar = (item, i) => {
            const color = nthColor(i)
            const x = barGap*(i + 1) + i*barWidth
            const tx = x + barWidth/2
            const ty = 0
            return [<rect key={2*i} x={x} y={this.axisThick} width={barWidth} height={item.y*yScale - this.axisThick} stroke={color} strokeWidth="1"  fill={color} />,
                <text key={2*i +1} className='y-label' textAnchor="end" transform={`rotate(90, ${tx}, ${ty})`} x={tx} y={ty} dx='-1em' alignmentBaseline="middle">{item.x}</text>]
        }        

        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${this.fullWidth} ${this.fullHeight}`} width={this.width} height={this.height} >
                
                <title id="ttl">Title</title>
                <text className='chart-title' textAnchor="middle" x={this.fullWidth / 2 - this.pad} dy='1.5em' alignmentBaseline="middle">{title}</text>

                <g opacity = '0.5'>
                    <rect x="0" y="0" width={this.fullWidth} height={this.fullHeight} stroke="blue" strokeWidth="4"  fill="none"/>
                </g>

                <g transform = {`translate(${3*this.pad}, ${this.fullHeight - 4*this.pad}) scale(1, -1)`}>
                    <g className='axises'>
                        <path d={`M0 0 V${this.height - this.arrowHeight/2}`} stroke='black' strokeWidth={this.axisThick} strokeLinecap="square" />
                        <path d={`M0 ${this.height} L${this.arrowWidth05} ${this.height - this.arrowHeight} H-${this.arrowWidth05} Z`} stroke='black' strokeWidth='1' />
                        <path d={`M0 0 H${this.width - this.arrowHeight/2}`} stroke='black' strokeWidth={this.axisThick} strokeLinecap="square" />
                        <path d={`M${this.width} 0 L${this.width - this.arrowHeight} ${this.arrowWidth05} V-${this.arrowWidth05} Z`} stroke='black' strokeWidth='1' />
                    </g>
                    {Array.from(flatten(data.map(makeBar)))}
                </g>
            </svg>            
        )
    }
}

class D3BarChart extends ChartBase {
    componentDidUpdate (prevProps, prevState) {
        this.applyD3()
    }

    componentDidMount () {
        this.applyD3()
    }
    
    applyD3() {        
        const {data, title} = this.props.graphData

        const nthColor = i => this.palette[i % this.palette.length]

        const x = d3.scaleBand().rangeRound([0, this.width]).padding(0.1)
        x.domain(data.map(d => d.x ))        
        const xAxis = d3.axisBottom(x)

        const y = d3.scaleLinear().range([this.height-this.axisThick, this.axisThick])
        y.domain([0, d3.max(data, item => item.y)])
        const yAxis = d3.axisLeft(y).ticks(10)
                

        d3.select(".chart-container").selectAll('svg').data([1])
            .enter().append("svg")
                .attr('width', this.fullWidth)
                .attr('height', this.fullHeight)
        

        const svg = d3.select(".chart-container > svg")
                        

        svg.selectAll('title').data([1]).enter().append('title')
            .attr('id', 'ttl')
            .text('Title')

        //add chart title
        svg.selectAll('text.chart-title').data([1]).enter().append('text')
            .attr('class', 'chart-title')
            .attr('text-anchor', 'middle')
            .attr("x", this.fullWidth / 2 - this.pad)
            .attr('dy', '1.2em')
            .attr('alignment-baseline', 'middle')
            .text(title)

        //add bordr frame
        svg.selectAll('rect.chart-bounds').data([1]).enter().append('rect')
            .attr('class', 'chart-bounds')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', this.fullWidth)
            .attr('height', this.fullHeight)
            .attr('stroke', 'blue')
            .attr('stroke-width', 4)
            .attr('fill', 'none')
            .attr('opacity', 0.5)

        //add X axis
        svg.selectAll('g.x-axis').remove()
        svg.selectAll('g.x-axis').data([1]).enter().append('g')
            .attr("class", "x-axis")
            .attr("transform", `translate(${3*this.pad}, ${this.fullHeight - 4*this.pad})`)
            .call(xAxis)
                .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", "-.55em")
                    .attr("transform", "rotate(-90)" )
            
                
        //add Y axis
        svg.selectAll('g.y-axis').remove()
        svg.selectAll('g.y-axis').data([1]).enter().append('g')
            .attr("class", "y-axis")
            .attr("transform", `translate(${3*this.pad}, ${2*this.pad})`)
            .call(yAxis)
                .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Value ($)")

        const first = svg.selectAll('.bars').length === 0
console.log(first)
        svg.selectAll('.bars').data([1]).enter().append('g')
            .attr("class", "bars")
            .attr("transform", `translate(${3*this.pad}, ${2*this.pad - this.axisThick})`)

        //https://bl.ocks.org/RandomEtc/cff3610e7dd47bef2d01
        const bars = svg.selectAll('.bars').selectAll('.bar').data(data)
        bars.exit().remove()
 
        bars.enter()                    
            .append('rect')            
            .attr("class", "bar")
            .style("fill", (d, i) => nthColor(i))
            .attr("x", d => x(d.x))
            .attr("width", x.bandwidth())
            .attr("y", d => y(d.y))
            .attr("height", d => this.height - y(d.y) )

        .merge(bars)
            .transition().duration(500)
            .style("fill", (d, i) => nthColor(i))
            .attr("x", d => x(d.x))
            .attr("width", x.bandwidth())
            .attr("y", d => y(d.y))
            .attr("height", d => this.height - y(d.y) )
    }

    render() {
        return <div className='chart-container'></div>
    }
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {year: 0, chart: 0}
    }

    /*
    componentDidUpdate (prevProps, prevState) {
        this.applyD3()
    }

    componentDidMount () {
        this.applyD3()
    }
    
    applyD3() {
        const arr = this.state.year === 0 ? [4, 8, 15, 100, 16, 23, 42]:[422, 23, 16]

        const tmp = d3.select("body")
            .selectAll("div.test")
            .selectAll("p")
            .data(arr)
            
            tmp.text((d) =>"I’m number " + d + "!")            

            tmp.enter().append("p")
                .text((d) =>"I’m number " + d + "!")     

            tmp.exit().remove()       
    }
    */
    
    static graphData = {
        title: 'Electricity consumpsion 2015 per month',
        data: [
            {x: 'January',  y: 120},
            {x: 'February', y: 90},
            {x: 'March',    y: 160},
            {x: 'April',    y: 70},
            {x: 'May',      y: 140},
            {x: 'Jun',      y: 50},
            {x: 'July',     y: 190}

            /*{x: 'July 2',     y: 19},
            {x: 'July 3',     y: 140},
            {x: 'July 4',     y: 160}*/
        ]
    }

    static graphData2 = {
        title: 'Electricity consumpsion 2016 per month',
        data: [
            {x: 'January',  y: 50},
            {x: 'February', y: 120},
            {x: 'March',    y: 110},
            {x: 'April',    y: 40},
            {x: 'May',      y: 190},
            {x: 'Jun',      y: 200},
            {x: 'July',     y: 120},
            {x: 'August',   y: 100}
        ]
    }

     handleToggleYear = e => {
         this.setState( (p, s) => ({year: p.year === 1 ? 0:1}) )
    }
    handleToggleChart = e => {
         this.setState( (p, s) => ({chart: p.chart === 1 ? 0:1}) )
    }

    render() {
        /*const q=[
            {question: 'q1', answer:'a1'}, 
            {question: 'q2', answer:'a2'},
            {question: 'q3', answer:'a3'}
        ]

        return <QuestionList questions={q} />*/

        const styleContainer = {
            textAlign: 'center',
            marginTop: '20px'            
        }   

        const Chart = this.state.chart ?  D3BarChart:SvgBarChart

        return (<div style={styleContainer}>
             <label>
                <input type="checkbox"
                    name='year'
                    checked={this.state.year === 1}
                    onClick={this.handleToggleYear}
                    value={this.state.year} />
                    Toggle year
            </label>
            <label>
                <input type="checkbox"
                    name='chart'
                    checked={this.state.chart === 1}
                    onClick={this.handleToggleChart}
                    value={this.state.chart} />
                    Use D3 chart
            </label>
            <Chart graphData={this.state.year === 0 ? App.graphData:App.graphData2} /> 
        </div>)
    }
}

export default App
