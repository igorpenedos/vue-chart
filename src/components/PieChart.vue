<script>
import {defineComponent, h} from 'vue'

export default defineComponent({
  name: 'PieChart',
  props: {
    data: { 
      type: Array,
      default(){
        return []
      }
    },
    height: {
      type: Number,
      default(){
        return 100
      }
    },
    width: {
      type: Number,
      default(){
        return 100
      }
    }
  },
  setup(props) {

    const total = props.data.reduce((prev, cur) => {
      return prev + cur.amount
    }, 0)

    let filled = 0

    const randomColor = () => {
      return `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
    }

    const percentage = (amount) => {
      return (amount/total) * 100
    }

    const degreeToRotate = (percentage) => {
      const percentageOnPieChart = filled > 0 ? filled : 0
      filled += percentage
      return -90 + ((percentageOnPieChart/ 100) * 360)
    }

    return () => h('svg', 
    {
      height: `${props.height}`, 
      width: `${props.width}`, 
      viewBox: `0 0 20 20`
    }, 
    [props.data.map((data) => {
      return h(
        'circle', 
        {
          id: `${data.key}`,
          r: "5", 
          cx: "10", 
          cy: "10", 
          fill: "transparent",
          stroke: `${randomColor()}`, 
          "stroke-width": "10", //same size as the background circle
          "stroke-dasharray": `calc(${percentage(data.amount)} * 31.4 / 100) 31.4`,//31.4 is the diameter which is 2 * pi * radius
          transform: `rotate(${degreeToRotate(percentage(data.amount))})`,
          "transform-origin": "center",
        },
        )
      })
    ])
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  svg{
    height: 500px;
    width: 500px;
  }
</style>
