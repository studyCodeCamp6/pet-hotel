import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import {
    SearchProviderByName,
    SearchProviderByType,
    SearchOptions
} from './customers/search/SearchProvider'
import {
    Row,
    Col
} from 'antd'

function Home() {

    const [searchType, setSearchType] = useState('hotel')

    return (
        <div style={{ height: '82vh' }}>
            <Row justify='center'>
                <SearchOptions setSearchType={setSearchType} />
            </Row>
            <Row justify="center">
                {
                    (searchType === 'hotel') ?
                        <Col>
                            <SearchProviderByName />
                        </Col>
                        :
                        (searchType === 'type') ?
                            <Col>
                                <SearchProviderByType />
                            </Col>
                            :
                            null
                }
            </Row>
        </div >
    )
}

export default withRouter(Home)
