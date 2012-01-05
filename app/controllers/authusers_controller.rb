class AuthusersController < ApplicationController
  # GET /authusers
  # GET /authusers.json
  def index
    @authusers = Authuser.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @authusers }
    end
  end

  # GET /authusers/1
  # GET /authusers/1.json
  def show
    @authuser = Authuser.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @authuser }
    end
  end

  # GET /authusers/new
  # GET /authusers/new.json
  def new
    @authuser = Authuser.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @authuser }
    end
  end

  # GET /authusers/1/edit
  def edit
    @authuser = Authuser.find(params[:id])
  end

  # POST /authusers
  # POST /authusers.json
  def create
    @authuser = Authuser.new(params[:authuser])

    respond_to do |format|
      if @authuser.save
        format.html { redirect_to @authuser, notice: 'Authuser was successfully created.' }
        format.json { render json: @authuser, status: :created, location: @authuser }
      else
        format.html { render action: "new" }
        format.json { render json: @authuser.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /authusers/1
  # PUT /authusers/1.json
  def update
    @authuser = Authuser.find(params[:id])

    respond_to do |format|
      if @authuser.update_attributes(params[:authuser])
        format.html { redirect_to @authuser, notice: 'Authuser was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @authuser.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /authusers/1
  # DELETE /authusers/1.json
  def destroy
    @authuser = Authuser.find(params[:id])
    @authuser.destroy

    respond_to do |format|
      format.html { redirect_to authusers_url }
      format.json { head :ok }
    end
  end
end
