import LoadingOutlined from "@ant-design/icons/lib/icons/LoadingOutlined";

import React, {Component} from 'react'
import InboxOutlined from '@ant-design/icons/lib/icons/InboxOutlined'
import {beforeUpload, getBase64} from '../../../util/PictureLoaderUtil'
import './ImageLoader.css'
import {Upload} from 'antd'

const {Dragger} = Upload

export default class ImageLoader extends Component {


    state = {
        imageUrl: this.props.imageUrl,
        loading: false
    }

    render() {
        const uploadButton = (
            <div>
                {
                    this.state.loading
                        ? <LoadingOutlined/>
                        : <p className="ant-upload-drag-icon">
                            <InboxOutlined/>
                        </p>
                }
            </div>
        )

        return (
            <aside className="aside-picture">
                <Dragger
                    name="file"
                    listType="picture"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={this.handleUploadImageChange}>

                    {
                        this.state.imageUrl ?
                            <img src={this.state.imageUrl}
                                 alt=""
                            />
                            :
                            uploadButton
                    }

                    <p className="ant-upload-text">
                        Click to choose image...
                    </p>
                </Dragger>
            </aside>
        )
    }


    handleUploadImageChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({
                loading: true
            });
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl =>

                this.setState({
                    imageUrl: imageUrl,
                    loading: false,
                }, () => {
                    this.props.handleImageUrlChange(this.state.imageUrl);
                })
            )
        }
    }
}