
// Works when you only have one object. maybe you need to have one seperate endpoint. 
export const deleteObject = async (req, res) => {
    const { userId, projectId, drinksProjectId } = req.params
    
    const { drinksProject } = req.body
  
   try{
       const projectToChange= await Project.findById(projectId);
       const deletedAdd = await ProjectSchema.findByIdAndUpdate(drinksProjectId,
        {$pull: {
          drinksProject: drinksProjectId,
        },
        },
       {new:true} 
        ).populate({
          path:"projectDrinks",
          model: ProjectSchema,
        
        })
    
      if (deletedAdd){
      /*   const projectToChange = await Project.findOne({ projectId })
        
        const deleteAddon= await Project.findByIdAndUpdate({ drinksProject }
          {
            $pull:{drinks: { $elemMatch:{drinks: drinks.name} }}
          }  
  
        ) */
          
        /*   { _id: projectId },
          { $pull:{ drinks: { ObjectId : _id }
              /* decorations,
              drinks ,
              food,
              activities , */
          /*   }, */
            /* $set:{theme: null } 
          },
          {new:true}
          ) */
          res.status(200).json({
          response: "deleted object",
          data: deletedAdd
        })
  
      } else {
        res.status(500).json({
          response: "Could not update"
        })
      }
   }catch(error) {
        res.status(401).json({
          response: "Invalid credentials",
          success: false,
          error: error
   })
  }
  }
  