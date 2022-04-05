import React, { Component } from 'react'

export default class CatalogAddItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fillName: "",
            fillPrice: "",
            loading: false,
            error: false 
        }
    }
}