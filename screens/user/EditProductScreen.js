import React, { useEffect, useCallback, useReducer } from "react";
import { View, StyleSheet, ScrollView, Platform, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import Input from "../../components/UI/Input";
import * as productsActions from "../../store/actions/products";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid
    };
  }
  return state;
};

const EditProductScreen = props => {
  const prodId = props.navigation.getParam("productId");

  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: ""
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    },
    formIsValid: editedProduct ? true : false
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input!", "Please check the form", [{ text: "Okay" }]);
      return;
    }
    if (editedProduct) {
      // Dispatch update action
      dispatch(
        productsActions.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      // Dispatch create action
      dispatch(
        productsActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label="Title"
          errorText="Please enter a valid input"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.title : ""}
          initiallyValid={!!editedProduct}
          required
        />
        <Input
          id="imageUrl"
          label="Image Url"
          errorText="Please enter a valid input"
          keyboardType="default"
          returnKeyType="next"
          initialValue={editedProduct ? editedProduct.imageUrl : ""}
          onInputChange={inputChangeHandler}
          initiallyValid={!!editedProduct}
          required
        />
        {editedProduct ? null : (
          <Input
            id="price"
            label="Price"
            errorText="Please enter a valid input"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            required
            min={0.1}
          />
        )}
        <Input
          id="description"
          label="Description"
          errorText="Please enter a valid input"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={3}
          initialValue={editedProduct ? editedProduct.description : ""}
          onInputChange={inputChangeHandler}
          initiallyValid={!!editedProduct}
          required
          minLength={3}
        />
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => {
      const submitFn = navData.navigation.getParam("submit");
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName={Platform === "android" ? "md-checkmark" : "ios-checkmark"}
            onPress={submitFn}
          />
        </HeaderButtons>
      );
    }
  };
};

const styles = StyleSheet.create({
  form: { margin: 20 }
});

export default EditProductScreen;
