/**
 *
 * @description
 * Este es el lugar de nuestra vista principal de la App
 * Arriba de todo importamos las librerias externas a nuestro proyecto
 * seguido por los componentes de nuestra vista
 * dejando de ultimo cualquier lib o helper
 *
 * @function App
 * puede ser una clase que extienda de React y la diferencia principal
 * seria el uso de hooks, donde llamo a useContext y useState
 * usar context en una clase se llamaria con un metodo estatico
 * `static contextType = PostContext;`
 * en una clase la unica diferencia bloqueante es que podemos usar
 * solo un context por clase, con un componente stateless o funcion
 * podemos tener varias de ellas
 *
 * @author Carlos Manotas <carlosmanotas@gmail.com>
 *
 */

import React, { useContext, useState } from "react";
import { List, Modal } from "antd";

import { Layout, NewOrEditPost, ActionButton, Header } from "./components";

import { PostContext } from "./context/postContext";

let formRefUsers;

function App() {
  const { posts, deletePost, loading, newPost, editPost } = useContext(
    PostContext
  );

  const [modalState, setModalState] = useState({
    visible: false,
    confirmLoading: false,
    currentUser: {}
  });

  const handleCancel = () => {
    const form = formRefUsers.props.form;
    setModalState({ ...modalState, visible: false, currentUser: {} });
    form.resetFields();
  };

  const saveFormRef = formRef => {
    formRefUsers = formRef;
  };

  const handleSubmitPost = () => {
    setModalState({ ...modalState, confirmLoading: true });
    const form = formRefUsers.props.form;
    form.validateFields(async (err, values) => {
      if (err) {
        setModalState({ ...modalState, confirmLoading: false });
        return;
      }
      const formatValues = {
        ...values,
        userId: Number(values.userId)
      };
      formatValues.id
        ? await editPost(formatValues)
        : await newPost(formatValues);
      form.resetFields();
      setModalState({ currentUser: {}, confirmLoading: false, visible: false });
    });
  };

  const editPostModal = currentUser => {
    setModalState({ ...modalState, currentUser, visible: true });
  };

  const addNewPostModal = () => setModalState({ ...modalState, visible: true });

  return (
    <Layout>
      <List
        loading={loading}
        header={<Header onClick={addNewPostModal} />}
        pagination={{ pageSize: 5 }}
        dataSource={posts}
        renderItem={post => (
          <List.Item
            actions={[
              <ActionButton type="edit" onClick={editPostModal} post={post} />,
              <ActionButton type="delete" onClick={deletePost} post={post} />
            ]}
          >
            <List.Item.Meta title={post.title} description={post.body} />
          </List.Item>
        )}
      />
      <Modal
        title="NEW POST"
        visible={modalState.visible}
        onOk={handleSubmitPost}
        confirmLoading={modalState.confirmLoading}
        onCancel={handleCancel}
      >
        <NewOrEditPost
          wrappedComponentRef={saveFormRef}
          currentUser={modalState.currentUser}
        />
      </Modal>
    </Layout>
  );
}

export default App;
