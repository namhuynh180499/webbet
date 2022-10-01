import { Header } from "./components"
import {keo1} from "./keo"
import {keo2} from "./keo"
import {keo3} from "./keo"
import {keo4} from "./keo"
import {keo5} from "./keo"
import {keo6} from "./keo"
import {keo7} from "./keo"
import {VeCuoc} from "./components"
import {checkBill} from "./components"
class Keo extends React.Component {
    constructor(props) {
        super(props);
        this.changeHiep = this.changeHiep.bind(this)
        this.chonKeo = this.chonKeo.bind(this)
    }
    changeHiep(e) {
        const hiep = e.target;
        const cacKeoDau = document.getElementsByClassName(`soi-keo`)
        {( hiep.innerHTML == "Hiệp 1") ?  hiep.innerHTML="Cả trận": hiep.innerHTML="Hiệp 1"}
        for(let i=0;i<cacKeoDau.length;i++) {
            if(hiep == cacKeoDau[i]) {
                let x = (i+1)*2;
                const a = document.getElementsByClassName(`keo-hiep`)[x-1];
                if(a.classList[a.classList.length - 1]=="checking") {a.classList.remove(`checking`)}
                else {a.classList.add('checking')}
            }
        }
    }
    chonKeo(e) {
        if(e.target.classList[e.target.classList.length - 1] == `chon-keo`) {
            e.target.classList.remove('chon-keo')
            this.props.remove(e.target.getAttribute("co"),e.target.getAttribute("value"),e.target.getAttribute("value2"));
        }
        else {
            e.target.classList.add(`chon-keo`)
            this.props.add(e.target.getAttribute("co"),e.target.getAttribute("value"),e.target.getAttribute("value2"));
        }
        
    }
    render () {
        const ds = [
            this.props.keo.chap,
            this.props.keo.chap1,
            this.props.keo.tx,
            this.props.keo.tx1
        ] 
        let danhSachKeo = [,,,]
        for(let i=0; i<2;i++) {
            danhSachKeo[i] = ds[i].map((x) => {
                const home = this.props.keo.home;
                const away = this.props.keo.away; 
                let homeKeo = Number(x[0])
                let awayKeo = Number(x[0]) * (-1)
                if (homeKeo > 0) {homeKeo = `+` + homeKeo.toString() }
                if (awayKeo > 0) {awayKeo = `+` + awayKeo.toString() }
                return (
                    <div className="keo">
                        <div className="lai" value={home+' '+homeKeo} value2={ x[1]} co={x[1]} onClick={this.chonKeo}>{x[1]}</div>
                        <div className="keochinh">{x[0]}</div>
                        <div className="lai"value={away+' '+awayKeo} value2={ x[2]}co={x[2]}onClick={this.chonKeo}>{x[2]}</div>
                    </div>
                )
            })
        }
        for(let i=2; i<4;i++) {
            danhSachKeo[i] = ds[i].map((x) => { 
                let keoTai = Number(x[0])
                let keoXiu = Number(x[0])
                return (
                    <div className="keo">
                        <div className="lai" value={"Tài"+' '+keoTai} value2={x[1]}co={x[1]} onClick={this.chonKeo}>{x[1]}</div>
                        <div className="keochinh">{x[0]}</div>
                        <div className="lai"value={"Xỉu"+' '+keoXiu} value2={x[2]}co={x[2]} onClick={this.chonKeo}>{x[2]}</div>
                    </div>
                )
            })
        }
        const keoChap = danhSachKeo[0]
        const keoChap1= danhSachKeo[1]
        const keoTx= danhSachKeo[2]
        const keoTx1= danhSachKeo[3]
        
        const CapDau = () => {
            return (
                <div className="battle">
                    <div className="team team1">{this.props.keo.home}</div>
                    <div className="soi-keo" onClick={this.changeHiep}>Cả trận</div>
                    <div className="team team2">{this.props.keo.away}</div>
                </div>
            )
        }
        const TiLeCuoc = () => {
            
            return (
            <div>
                <div className="keo-hiep">{keoChap1}Tài/Xỉu{keoTx1}</div>
                <div className="keo-hiep">{keoChap} Tài/Xỉu {keoTx}</div>
            </div>)
        }
        return (
            <div className="match">
                <CapDau />
                <TiLeCuoc  />
            </div>
        )
    }
}
class AddBill extends React.Component {
    constructor(props) {
        super(props)
        this.state = {sotien: ''}
        this.nhapSoTien = this.nhapSoTien.bind(this)
    }
    nhapSoTien(e) {
        this.setState({sotien: e.target.value })
    }
    render() {
        return (
            <div className="input-tien">
                <h3 className="tran">• {this.props.keo}</h3>
                <h3>{this.props.uoctinh}</h3>
                <div className="nhap-tien">
                    <input type="text" value={this.state.sotien} onChange={this.nhapSoTien}/>
                </div>
                <p>{(this.state.sotien*this.props.co).toFixed(0)}</p>
            </div>
        )
    }
}
let danhSachVeCuoc = []

function updateCuoc(a) {
    ReactDOM.render(
        a,document.querySelector(`.themvecuoc`)
    )
    
    checkBill();
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.addBet = this.addBet.bind(this)
        this.removeBet = this.removeBet.bind(this)
    }
    removeBet(a,b,c) {

        for(let i=0;i<danhSachVeCuoc.length;i++){

            if(danhSachVeCuoc[i].key == b) {danhSachVeCuoc.splice(i,1)}
        }
        console.log(danhSachVeCuoc)
        let tatCaVe = (<div>{danhSachVeCuoc.map((x) => x)}</div>)
        updateCuoc(tatCaVe)  
    }
    addBet(a,b,c) {
        
        danhSachVeCuoc.push((<AddBill  co={a} keo={b} key={b} uoctinh={c}/>))
        
        let tatCaVe = (<div>{danhSachVeCuoc.map((x) => x)}</div>)
        updateCuoc(tatCaVe)  
    }
    render () {
        return (
            <div>
            <div className="board">
                <Header />
                <Keo keo={keo1} add={this.addBet} remove={this.removeBet}/>
                <Keo keo={keo2} add={this.addBet} remove={this.removeBet}/>
                <Keo keo={keo3} add={this.addBet} remove={this.removeBet}/>
                <Keo keo={keo4} add={this.addBet} remove={this.removeBet}/>
                <Keo keo={keo5} add={this.addBet} remove={this.removeBet}/>
                <Keo keo={keo6} add={this.addBet} remove={this.removeBet}/>
                <Keo keo={keo7} add={this.addBet} remove={this.removeBet}/>
               
            </div>
            <VeCuoc/>
            </div>
        )
    }
}
  
ReactDOM.render(
    <App />,
    document.getElementById(`id`)
)