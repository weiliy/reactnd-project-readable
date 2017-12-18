import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Modal,
  Input,
  Select,
} from 'antd';
import { addPost } from '../actions';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class AddPostModal extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const timestamp = Date.now();
        const id = encodeURIComponent(`${values.title.replace(/\s/, '-')}-${timestamp}`);
        this.props.addPost({
          ...values,
          timestamp,
          id,
        }, () => {
          this.props.form.resetFields();
          this.props.onOk();
        });
      }
    });
  }

  handleCancel = () => {
    this.props.form.resetFields();
    this.props.onCancel();
  }

  render() {
    const {
      form: { getFieldDecorator },
      categories,
      visible,
      onOk,
      onCancel,
    } = this.props;

    return (
      <Modal
        visible={visible}
        title="New Post"
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
      >
        <Form>
          <FormItem
            label="title"
          >
            {getFieldDecorator('title', { rules: [{ required: true }] })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="author"
          >
            {getFieldDecorator('author', { rules: [{ required: true }] })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="Categories"
          >
            {getFieldDecorator('category', { rules: [{ required: true }] })(
              <Select>
                {categories.map(c => <Option key={c} value={c}>{c}</Option>)}
              </Select>
            )}
          </FormItem>
          <FormItem
            label="body"
          >
            {getFieldDecorator('body', { rules: [{ required: true }] })(
              <TextArea />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories: categories.allNames,
});

const mapDispatchToProps = dispatch => ({
  addPost: (post, callback) => dispatch(addPost(post, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(AddPostModal));

