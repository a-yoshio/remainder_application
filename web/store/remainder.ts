import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { RemainderModel } from '@/models/Remainder'
import { regist, update, get } from '@/services/RemainderService'
import { RemainderForm } from '../forms/Remainder'

@Module({ name: 'remainder', namespaced: true, stateFactory: true })
export default class RemainderModule extends VuexModule {
    // state
    id: number|undefined = undefined
    contents: string = ''
    user_id: number = 0
    tag_id: number = 0
    datetime: Date|null = null
    date: string = ''
    time: string = ''
    complete: boolean = false
    // mutation
    @Mutation
    public setRemainder(remainder: RemainderModel) {
        this.id = remainder.id
        this.contents = remainder.contents
        this.user_id = remainder.user_id
        this.tag_id = remainder.tag_id
        this.datetime = remainder.datetime
        this.complete = remainder.complete
        this.date = remainder.getDate()
        this.time = remainder.getTime()
    }

    @Mutation
    public setTime(time: string) {
        this.time = time
    } 

    @Mutation
    public setDate(date: string) {
        if (!date) return null

        const [year, month, day] = date.split("-")
        this.date = `${year}-${month}-${day}`
    }

    @Mutation
    public setContents(contents: string) {
        this.contents = contents
    }

    @Mutation
    public setComplete(complete: boolean) {
        this.complete = complete
    }    

    // action
    @Action({rawError:true})
    public async get(remainderId: number): Promise<void> {
        const remainder:RemainderModel = await get(remainderId)
        this.setRemainder(remainder)
        return
    }

    @Action({rawError:true})
    public async regist(remainder: RemainderForm): Promise<Boolean> {
        console.log(remainder)
        try {
            return await regist(remainder)
        } catch (e) {
            console.error(e)
            return false
        } 
    }
    @Action({rawError:true})
    public async update(userId: number, contents: string, tagId: number, datetime: Date, complete: boolean, remainderId: number) {
        return await update(userId, contents, tagId, datetime, complete, remainderId)
    }

    // public async delete(remainderId: number) {
    //     return await deleteRemainder(remainderId)
    // }
    // getter
    // get name() {}
}
