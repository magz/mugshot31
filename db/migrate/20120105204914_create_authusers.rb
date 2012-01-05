class CreateAuthusers < ActiveRecord::Migration
  def change
    create_table :authusers do |t|

      t.timestamps
    end
  end
end
