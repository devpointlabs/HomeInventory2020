require 'test_helper'

class Api::ReceiptsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_receipts_index_url
    assert_response :success
  end

  test "should get create" do
    get api_receipts_create_url
    assert_response :success
  end

  test "should get edit" do
    get api_receipts_edit_url
    assert_response :success
  end

  test "should get destroy" do
    get api_receipts_destroy_url
    assert_response :success
  end

end
