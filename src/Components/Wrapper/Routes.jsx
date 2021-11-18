import React from 'react'
import {Switch, Route, Redirect} from 'react-router'

import Pedidos from '../Pedidos/Pedidos'
import HistoricoPedidos from '../HistoricoPedidos/HistoricoPedidos'

export default props =>
    <Switch>
        <Route exact path='/pedidos' component={Pedidos} />
        <Route path='/historico' component={HistoricoPedidos} />
    </Switch>