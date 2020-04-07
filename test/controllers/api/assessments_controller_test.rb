require 'test_helper'

class Api::AssessmentsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_assessments_index_url
    assert_response :success
  end

  test "should get show" do
    get api_assessments_show_url
    assert_response :success
  end

  test "should get update" do
    get api_assessments_update_url
    assert_response :success
  end

  test "should get new" do
    get api_assessments_new_url
    assert_response :success
  end

  test "should get create" do
    get api_assessments_create_url
    assert_response :success
  end

end
