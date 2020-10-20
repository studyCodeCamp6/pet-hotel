import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { SearchStore } from './customers/search/ContextStore'
import {
    SearchProviderByName,
    SearchProviderByType,
    SearchOptions,
    SearchProviderByArea
} from './customers/search/SearchProvider'
import {
    Row,
    Col
} from 'antd'

function Home() {

    const { setSearchResult } = useContext(SearchStore)
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
                            <SearchProviderByName setSearchResult={setSearchResult} />
                        </Col>
                        :
                        (searchType === 'type') ?
                            <Col>
                                <SearchProviderByType setSearchResult={setSearchResult} />
                            </Col>
                            :
                            <Col>
                                <SearchProviderByArea setSearchResult={setSearchResult} />
                            </Col>
                }
            </Row>
        </div >
    )
}

export default withRouter(Home)
